#!/usr/bin/env node
/** Structural validation only; never certifies a reference audit or app implementation. */
import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const defaultRoot = fileURLToPath(new URL('../', import.meta.url));
const statuses = new Set(['todo', 'in_progress', 'blocked', 'done', 'deferred']);
const labels = ['**Files:**', '**Inputs:**', '**Build:**', '**Verify:**', '**Evidence:**', '**Done when:**'];

function parseTasks(text, file) {
  const headings = [...text.matchAll(/^### ((?:VLK|EXP)-\d{3}) — (.+)$/gm)];
  return headings.map((match, index) => {
    const block = text.slice(match.index, headings[index + 1]?.index ?? text.length);
    const rawDependencies = block.match(/^Depends on: (.+)$/m)?.[1]?.trim() ?? '';
    return {
      id: match[1], title: match[2], file, block, rawDependencies,
      status: block.match(/^Status: (\S+)\s*$/m)?.[1] ?? '',
      dependencies: rawDependencies === 'none' ? [] : rawDependencies.split(',').map(item => item.trim()).filter(Boolean),
    };
  });
}

function graphErrors(tasks, enforceCounts = true) {
  const errors = [];
  const byId = new Map();
  for (const task of tasks) {
    if (byId.has(task.id)) errors.push(`Duplicate task ${task.id}`);
    else byId.set(task.id, task);
    if (!statuses.has(task.status)) errors.push(`${task.id}: invalid status`);
    if (!task.rawDependencies) errors.push(`${task.id}: missing dependencies`);
    if (new Set(task.dependencies).size !== task.dependencies.length) errors.push(`${task.id}: duplicate dependency`);
    if (task.id.startsWith('EXP-')) {
      for (const label of labels) if (!task.block.includes(label)) errors.push(`${task.id}: missing ${label}`);
    }
  }
  if (enforceCounts) {
    for (const [prefix, count] of [['VLK', 96], ['EXP', 48]]) {
      const selected = tasks.filter(task => task.id.startsWith(`${prefix}-`));
      if (selected.length !== count) errors.push(`Expected ${count} ${prefix} tasks, found ${selected.length}`);
      for (let n = 1; n <= count; n++) {
        const id = `${prefix}-${String(n).padStart(3, '0')}`;
        if (!byId.has(id)) errors.push(`Missing ${id}`);
      }
      for (const task of selected) {
        const number = Number(task.id.split('-')[1]);
        if (number < 1 || number > count) errors.push(`Out-of-range ${task.id}`);
      }
    }
  }
  for (const task of tasks) {
    for (const dependency of task.dependencies) {
      if (!byId.has(dependency)) errors.push(`${task.id}: unknown dependency ${dependency}`);
      if (dependency === task.id) errors.push(`${task.id}: self dependency`);
      if (task.status === 'done' && byId.has(dependency) && byId.get(dependency).status !== 'done') {
        errors.push(`${task.id}: done before prerequisite ${dependency}`);
      }
    }
  }
  const visiting = new Set();
  const visited = new Set();
  function visit(id, trail = []) {
    if (visiting.has(id)) { errors.push(`Cycle: ${[...trail, id].join(' -> ')}`); return; }
    if (visited.has(id) || !byId.has(id)) return;
    visiting.add(id);
    for (const dependency of byId.get(id).dependencies) visit(dependency, [...trail, id]);
    visiting.delete(id);
    visited.add(id);
  }
  for (const id of byId.keys()) visit(id);
  return errors;
}

function sourceErrors(register) {
  const errors = [];
  if (register?.schemaVersion !== 1 || !Array.isArray(register.sources) || register.sources.length === 0) {
    return ['Source register: expected schemaVersion 1 and nonempty sources'];
  }
  const ids = new Set();
  const relationshipStates = new Set(['unverified', 'listed-in-ui', 'asset-citation', 'payload-lineage', 'upstream-record-match']);
  const useStates = new Set(['candidate', 'reviewed', 'approved', 'imported', 'published']);
  const termsStates = new Set(['requires_review', 'approved', 'restricted', 'rejected']);
  for (const source of register.sources) {
    const id = source.id ?? '(missing ID)';
    if (!/^SRC-[A-Z0-9-]+$/.test(id) || ids.has(id)) errors.push(`Source ${id}: missing/invalid/duplicate ID`);
    ids.add(id);
    for (const field of ['name', 'domain', 'notes']) {
      if (typeof source[field] !== 'string' || !source[field].trim()) errors.push(`${id}: missing ${field}`);
    }
    try {
      const url = new URL(source.documentationUrl);
      if (url.protocol !== 'https:' || url.username || url.password) throw new Error('invalid');
    } catch { errors.push(`${id}: documentation URL must be HTTPS without credentials`); }
    if (!['reviewed', 'unreachable', 'unreviewed'].includes(source.documentationStatus)) errors.push(`${id}: invalid documentation status`);
    if (!relationshipStates.has(source.referenceRelationship)) errors.push(`${id}: invalid reference relationship`);
    if (!Array.isArray(source.referenceEvidence)) errors.push(`${id}: reference evidence must be an array`);
    else if (source.referenceRelationship !== 'unverified' && source.referenceEvidence.length === 0) {
      errors.push(`${id}: reference claim without evidence`);
    }
    if (!useStates.has(source.useStatus)) errors.push(`${id}: invalid use status`);
    if (!termsStates.has(source.termsStatus)) errors.push(`${id}: invalid terms status`);
    if (['approved', 'imported', 'published'].includes(source.useStatus)) {
      if (source.termsStatus !== 'approved' || !Array.isArray(source.termsEvidence) || source.termsEvidence.length === 0) {
        errors.push(`${id}: approved use without terms evidence`);
      }
    }
    if (['imported', 'published'].includes(source.useStatus) && (!Array.isArray(source.artifacts) || source.artifacts.length === 0)) {
      errors.push(`${id}: imported use without artifact references`);
    }
  }
  return errors;
}

function selfTest() {
  const card = (id, deps = 'none', status = 'todo') => `### ${id} — Fixture\nStatus: ${status}\nDepends on: ${deps}\n${labels.map(label => `${label} fixture`).join('\n')}\n`;
  const check = text => graphErrors(parseTasks(text, 'in-memory'), false);
  assert.equal(check(card('EXP-001')).length, 0);
  assert(check(card('EXP-001') + card('EXP-001')).some(error => error.includes('Duplicate')));
  assert(check(card('EXP-001', 'VLK-999')).some(error => error.includes('unknown dependency')));
  assert(check(card('VLK-001', 'EXP-001') + card('EXP-001', 'VLK-001')).some(error => error.includes('Cycle')));
  assert(check(card('VLK-001') + card('EXP-001', 'VLK-001', 'done')).some(error => error.includes('done before')));
  assert(check(card('EXP-001', 'none', 'pretend')).some(error => error.includes('invalid status')));
  assert(check(card('EXP-001').replace('**Evidence:**', '**Proof omitted:**')).some(error => error.includes('missing **Evidence:**')));
  const fixture = {
    schemaVersion: 1,
    sources: [{id: 'SRC-TEST', name: 'Fixture', domain: 'power', notes: 'Fixture only', documentationUrl: 'https://example.org/data', documentationStatus: 'unreviewed', referenceRelationship: 'unverified', referenceEvidence: [], useStatus: 'candidate', termsStatus: 'requires_review'}],
  };
  assert.equal(sourceErrors(fixture).length, 0);
  const changed = override => ({...fixture, sources: [{...fixture.sources[0], ...override}]});
  assert(sourceErrors(changed({referenceRelationship: 'listed-in-ui'})).some(error => error.includes('without evidence')));
  assert(sourceErrors(changed({documentationUrl: 'javascript:alert(1)'})).some(error => error.includes('HTTPS')));
  assert(sourceErrors(changed({useStatus: 'imported'})).some(error => error.includes('artifact references')));
  assert(sourceErrors(changed({useStatus: 'approved'})).some(error => error.includes('terms evidence')));
  assert(sourceErrors({...fixture, sources: [fixture.sources[0], fixture.sources[0]]}).some(error => error.includes('duplicate ID')));
  console.log('PASS: expanded parser, cross-graph, status and source-claim negative self-tests (in-memory only).');
}

async function main() {
  const args = process.argv.slice(2);
  const rootIndex = args.indexOf('--root');
  if (rootIndex !== -1 && !args[rootIndex + 1]) throw new Error('--root needs a directory');
  const root = rootIndex === -1 ? defaultRoot : path.resolve(args[rootIndex + 1]);
  if (args.includes('--self-test') || args.includes('--self-test-only')) selfTest();
  if (args.includes('--self-test-only')) return;
  const errors = [];
  const tasks = [];
  const definitions = [
    {directory: 'docs/roadmap', pattern: /^E\d{2}-.+\.md$/, files: 12, tasks: 8},
    {directory: 'docs/expanded/tasks', pattern: /^A[0-7]-.+\.md$/, files: 8, tasks: 6},
  ];
  for (const definition of definitions) {
    const directory = path.join(root, definition.directory);
    const filenames = (await readdir(directory)).filter(file => definition.pattern.test(file)).sort();
    if (filenames.length !== definition.files) errors.push(`${definition.directory}: expected ${definition.files} epics, found ${filenames.length}`);
    for (const filename of filenames) {
      const file = path.join(directory, filename);
      const parsed = parseTasks(await readFile(file, 'utf8'), path.relative(root, file));
      if (parsed.length !== definition.tasks) errors.push(`${filename}: expected ${definition.tasks} tasks, found ${parsed.length}`);
      tasks.push(...parsed);
    }
  }
  errors.push(...graphErrors(tasks));
  const register = JSON.parse(await readFile(path.join(root, 'docs/expanded/SOURCE_REGISTER.json'), 'utf8'));
  errors.push(...sourceErrors(register));
  if (errors.length) {
    console.error(`FAIL: ${errors.length} expanded planning error(s):\n${errors.map(error => `- ${error}`).join('\n')}`);
    process.exitCode = 1;
    return;
  }
  const counts = Object.fromEntries([...statuses].map(status => [status, tasks.filter(task => task.status === status).length]));
  console.log(`PASS: ${tasks.length} tasks (96 VLK + 48 EXP); combined dependency graph is acyclic.`);
  console.log(`PASS: ${register.sources.length} source candidates/records have consistent declared evidence states.`);
  console.log(`Task status: ${JSON.stringify(counts)}`);
  console.log('Scope: validates planning structure, not external URLs, source rights, actual audit evidence, application behavior or deployment.');
}

main().catch(error => {
  console.error(`Expanded planning validation failed: ${error.message}`);
  process.exitCode = 1;
});
