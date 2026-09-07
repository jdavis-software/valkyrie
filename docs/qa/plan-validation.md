# Planning validation evidence

## Scope

This report concerns the implementation plan and its checker only. No application, production dataset, runtime benchmark or public demo exists at this stage.

## Verified remote execution

- Workflow: `.github/workflows/plan-check.yml`.
- Checked commit: `db9a5c21f9d2f0fbae32ea3f71a7a7e22cdf0e1a`.
- [Actual successful run](https://github.com/jdavis-software/valkyrie/actions/runs/34084375119).
- [Actual job](https://github.com/jdavis-software/valkyrie/actions/runs/34084375119/job/101625487075).
- Command: `node scripts/check-plan.mjs --self-test`.
- GitHub reported `completed/success` for checkout, Node runtime verification and checker/self-tests.

The checker enforces 96 unique VLK task IDs, 12 epic files with eight tasks each, valid statuses, required card sections, existing task dependencies, no dependency cycles, and existing relative document/file targets. It also detects invalid 'done' states with incomplete prerequisites.

Self-tests cover valid parsing, duplicate tasks, unknown prerequisites, cycles, invalid status, premature completion, valid relative links, missing targets and repository-escaping paths. Temporary fixtures are removed after the tests.

## Limits

Relative target existence is checked; Markdown anchor fragments, external URL availability and GitHub issue-body synchronization are not automatically validated. The source registry's future rights decisions and current third-party API availability require implementation-time review. Structural validity does not prove the roadmap is perfectly estimated or that any application task has been completed.

Local container network resolution prevented a local Git clone. The reported validation came from the actual GitHub runner, not an imagined local run. Later documentation edits automatically trigger another run; see the [workflow history](https://github.com/jdavis-software/valkyrie/actions/workflows/plan-check.yml) for the checked SHA corresponding to each revision.

## Reproduce

From a checkout with Node 18 or later:

```bash
node scripts/check-plan.mjs --self-test
```

No npm/pnpm installation or external data provider is required for this planning check.
