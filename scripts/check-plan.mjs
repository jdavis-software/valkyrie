#!/usr/bin/env node
/** Validate Valkyrie's planning baseline without installing application dependencies. */
import assert from 'node:assert/strict';
import {mkdtemp, readFile, readdir, rm, writeFile, access} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const defaultRoot = fileURLToPath(new URL('../', import.meta.url));
const allowedStatuses = new Set(['todo', 'in_progress', 'blocked', 'done', 'deferred']);
const excluded = new Set(['.git', 'node_modules', '.cache', 'dist', 'coverage', 'playwright-report', 'test-results']);

function parseTasks(text, file) {
  const headings = [...text.matchAll(/^### (VLK-\d{3}) — (.+)$/gm)];
  return headings.map((match, index) => {
    const block = text.slice(match.index, headings[index + 1]?.index ?? text.length);
    const status = block.match(/^Status: (\S+)\s*$/m)?.[1] ?? '';
    const rawDependencies = block.match(/^Depends on: (.+)$/m)?.[1]?.trim() ?? '';
    const dependencies = rawDependencies === 'none' ? [] : rawDependencies.split(',').map(value => value.trim());
    return {id: match[1], title: match[2], status, dependencies, file, block, rawDependencies};
  });
}

function validateGraph(tasks, expectedCount = 96) {
  const errors = [];
  const byId = new Map();
  for (const task of tasks) {
    if (byId.has(task.id)) errors.push(`Duplicate task ${task.id}`);
    else byId.set(task.id, task);
    if (!allowedStatuses.has(task.status)) errors.push(`${task.id}: invalid/missing status ${task.status}`);
    if (!task.rawDependencies) errors.push(`${task.id}: missing dependency declaration`);
    for (const label of ['**Files:**', '**Build:**', '**Verify:**', '**Done when:**']) {
      if (!task.block.includes(label)) errors.push(`${task.id}: missing ${label}`);
    }
    if (new Set(task.dependencies).size !== task.dependencies.length) errors.push(`${task.id}: duplicate prerequisite`);
  }
  if (expectedCount !== null) {
    if (tasks.length !== expectedCount) errors.push(`Expected ${expectedCount} tasks, found ${tasks.length}`);
    for (let number = 1; number <= expectedCount; number++) {
      const id = `VLK-${String(number).padStart(3, '0')}`;
      if (!byId.has(id)) errors.push(`Missing task ${id}`);
    }
    for (const id of byId.keys()) {
      const number = Number(id.slice(4));
      if (number < 1 || number > expectedCount) errors.push(`Out-of-range task ${id}`);
    }
  }
  for (const task of tasks) {
    for (const dependency of task.dependencies) {
      if (!byId.has(dependency)) errors.push(`${task.id}: unknown dependency ${dependency}`);
      if (dependency === task.id) errors.push(`${task.id}: self-dependency`);
      if (task.status === 'done' && byId.has(dependency) && byId.get(dependency).status !== 'done') {
        errors.push(`${task.id}: done but prerequisite ${dependency} is not done`);
      }
    }
  }
  const visited = new Set();
  const active = new Set();
  function visit(id, trail = []) {
    if (active.has(id)) { errors.push(`Dependency cycle: ${[...trail, id].join(' -> ')}`); return; }
    if (visited.has(id) || !byId.has(id)) return;
    active.add(id);
    for (const dependency of byId.get(id).dependencies) visit(dependency, [...trail, id]);
    active.delete(id);
    visited.add(id);
  }
  for (const id of byId.keys()) visit(id);
  return errors;
}

async function markdownFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    if (excluded.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(fullPath));
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath);
  }
  return files;
}

async function relativeLinkErrors(file, text, root) {
  const errors = [];
  const withoutFences = text.replace(/```[\s\S]*?```/g, '');
  for (const match of withoutFences.matchAll(/!?\[[^\]]*\]\(([^\s)]+)(?:\s+[^)]*)?\)/g)) {
    const target = match[1];
    if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('#')) continue;
    const pathname = target.split(/[?#]/, 1)[0];
    if (!pathname) continue;
    let decoded;
    try { decoded = decodeURIComponent(pathname); }
    catch { errors.push(`${path.relative(root, file)}: invalid link encoding ${target}`); continue; }
    const resolved = path.resolve(path.dirname(file), decoded);
    const relative = path.relative(root, resolved);
    if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
      errors.push(`${path.relative(root, file)}: link escapes repository ${target}`);
      continue;
    }
    try { await access(resolved); }
    catch { errors.push(`${path.relative(root, file)}: missing link target ${target}`); }
  }
  return errors;
}

async function selfTest() {
  const card = (id, dependency = 'none') => `### ${id} — Test\nStatus: todo\nDepends on: ${dependency}\n\n**Files:** x\n**Build:** x\n**Verify:** x\n**Done when:** x\n`;
  const parse = text => parseTasks(text, 'fixture.md');
  assert.equal(validateGraph(parse(card('VLK-001')), null).length, 0);
  assert(validateGraph(parse(card('VLK-001') + card('VLK-001')), null).some(error => error.includes('Duplicate task')));
  assert(validateGraph(parse(card('VLK-001', 'VLK-999')), null).some(error => error.includes('unknown dependency')));
  assert(validateGraph(parse(card('VLK-001', 'VLK-002') + card('VLK-002', 'VLK-001')), null).some(error => error.includes('Dependency cycle')));
  assert(validateGraph(parse(card('VLK-001').replace('Status: todo', 'Status: pretend')), null).some(error => error.includes('invalid/missing status')));
  assert(validateGraph(parse(card('VLK-001') + card('VLK-002', 'VLK-001').replace('Status: todo', 'Status: done')), null).some(error => error.includes('prerequisite')));
  const directory = await mkdtemp(path.join(tmpdir(), 'valkyrie-plan-test-'));
  try {
    const file = path.join(directory, 'README.md');
    await writeFile(file, '# Fixture\n');
    assert.equal((await relativeLinkErrors(file, '[good](README.md)', directory)).length, 0);
    assert((await relativeLinkErrors(file, '[bad](missing.md)', directory)).some(error => error.includes('missing link')));
    assert((await relativeLinkErrors(file, '[bad](../outside.md)', directory)).some(error => error.includes('escapes repository')));
  } finally { await rm(directory, {recursive: true, force: true}); }
  console.log('PASS: parser/graph/status/link self-tests (temporary fixtures only).');
}

async function main() {
  const args = process.argv.slice(2);
  const rootIndex = args.indexOf('--root');
  if (rootIndex !== -1 && !args[rootIndex + 1]) throw new Error('--root requires a directory');
  const root = rootIndex === -1 ? defaultRoot : path.resolve(args[rootIndex + 1]);
  if (args.includes('--self-test')) await selfTest();
  const allFiles = await markdownFiles(root);
  const epicDirectory = path.join(root, 'docs', 'roadmap');
  const epicFiles = allFiles.filter(file => path.dirname(file) === epicDirectory && /^E\d{2}-.+\.md$/.test(path.basename(file))).sort();
  const errors = [];
  if (epicFiles.length !== 12) errors.push(`Expected 12 epic files, found ${epicFiles.length}`);
  const tasks = [];
  for (const file of epicFiles) {
    const parsed = parseTasks(await readFile(file, 'utf8'), path.relative(root, file));
    if (parsed.length !== 8) errors.push(`${path.relative(root, file)}: expected 8 task cards, found ${parsed.length}`);
    tasks.push(...parsed);
  }
  errors.push(...validateGraph(tasks));
  for (const file of allFiles) errors.push(...await relativeLinkErrors(file, await readFile(file, 'utf8'), root));
  if (errors.length) {
    console.error(`FAIL: ${errors.length} planning validation error(s):\n${errors.map(error => `- ${error}`).join('\n')}`);
    process.exitCode = 1;
    return;
  }
  const counts = Object.fromEntries([...allowedStatuses].map(status => [status, tasks.filter(task => task.status === status).length]));
  console.log(`PASS: ${tasks.length} tasks across ${epicFiles.length} epics; dependency graph is acyclic.`);
  console.log(`PASS: relative document/file links in ${allFiles.length} Markdown files resolve.`);
  console.log(`Task status: ${JSON.stringify(counts)}`);
  console.log('Scope: validates planning structure, not application implementation, external URLs or runtime QA.');
}

main().catch(error => {
  console.error(`Planning validation failed: ${error.message}`);
  process.exitCode = 1;
});
