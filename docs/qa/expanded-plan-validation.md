# Expanded planning validation — actual evidence

Recorded 2026-09-07 UTC. This report concerns planning structure only.

## Committed planning package

Commit: `f40cad9239271dc7c826a6ae1b76ae8436ab261f`.

The GitHub connector created the expanded task/specification tree and a child commit, then fast-forwarded main with force=false after verifying the previous head. Baseline task cards and original specifications were retained. Root handoff/operating/status documents were updated to distinguish the baseline release from the full target and keep the unfinished reference audit visible.

## Local checker tests

Environment: Node v22.16.0 in the working container.

Commands actually executed on the new checker:

```text
node check-expanded-plan.mjs --self-test-only
node --check check-expanded-plan.mjs
```

Both exited successfully. The self-tests use in-memory fixtures and check duplicate IDs, missing dependencies, cross-namespace cycles, premature done statuses, missing task sections, unsupported source attribution, unsafe documentation URLs, missing import artifacts and missing terms evidence. This was not a successful local full-repository clone or application build.

## GitHub Actions validation

[Run 34088575131](https://github.com/jdavis-software/valkyrie/actions/runs/34088575131) completed with conclusion **success** against commit `f40cad9239271dc7c826a6ae1b76ae8436ab261f`.

[Job 101637290774](https://github.com/jdavis-software/valkyrie/actions/runs/34088575131/job/101637290774) and decoded logs were read through GitHub. Actual runtime reported Node v22.23.2, Ubuntu 24.04.4. Both baseline and expanded steps passed:

```text
PASS: parser/graph/status/link self-tests (temporary fixtures only).
PASS: 96 tasks across 12 epics; dependency graph is acyclic.
PASS: relative document/file links in 47 Markdown files resolve.
PASS: expanded parser, cross-graph, status and source-claim negative self-tests (in-memory only).
PASS: 144 tasks (96 VLK + 48 EXP); combined dependency graph is acyclic.
PASS: 12 source candidates/records have consistent declared evidence states.
Task status: {"todo":143,"in_progress":0,"blocked":1,"done":0,"deferred":0}
```

The 47-document count applies to that commit, before this report and the issue index were added. The unchanged pinned checkout action emitted a Node 20 deprecation warning while the platform ran it on Node 24; the job still passed. Do not describe this as warning-free CI. Application foundation work should review supported action versions without weakening permissions or opting into an insecure runtime.

The workflow retains contents:read permissions and persist-credentials:false. No application dependencies, upstream data downloads or deployment were executed by the planning job.

## Issue synchronization

Issues #13–#20 were created and confirmed, each with six unchecked EXP task items and links to detailed canonical cards. Existing #1–#12 remain the baseline issues. See [expanded index](../expanded/ISSUES.md). No task was completed during planning.

## Reference attempt, separate from validation

A fresh isolated Chromium attempt at 2026-09-07T05:32:58Z failed before the app loaded with ERR_BLOCKED_BY_ADMINISTRATOR. This was not the owner's in-app tab. [Sanitized observation](reference-attempt-2026-09-07T053258Z.json) records the actual failure. Script elements on the error page are not application bundle evidence. No Power Atlas controls, source-panel rows, application network payloads or mobile states were tested.

The independently researched source register is not the site's actual source disclosure inventory. Documentation review does not approve import or redistribution. Exact target technology stack, runtime delivery, underlying provider use and original repository remain unverified.

## What these checks do not prove

No application implementation, real data import, source-rights approval, successful reference walkthrough, runtime test, orbit calculation, actual asset-scale benchmark, portfolio screenshot or live deployment is certified by this report. Those require the acceptance evidence in the task cards.
