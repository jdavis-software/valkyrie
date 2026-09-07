# A7 — Bounded improvement, delivery and portfolio evidence

No indefinite background work is promised. Complete three documented improvement cycles within an active authorized run, then hand off a prioritized queue. A public deployment is real only after its URL has been tested.

### EXP-043 — Create an evidence-driven improvement queue
Status: todo
Depends on: EXP-006, EXP-012

**Files:** `docs/execution/GAPS.md`, `config/improvement-policy.json`, optional issue synchronization script.
**Inputs:** reference-to-task matrix, source coverage report, unresolved data conflicts and actual UX/test findings.
**Build:** record gaps with domain/region, evidence, user impact, confidence, acquisition/implementation cost, dependencies and proposed acceptance proof. Prioritize correctness and broken journeys before cosmetic breadth. Use a transparent qualitative ordering rather than an invented scientific confidence score. Keep blocked rights/access work separate from code defects and missing coverage. Mark superseded/duplicate gaps instead of accumulating identical requests.
**Verify:** every gap has evidence and an actionable completion test; no task asks for private data, unlimited crawling or unauthorized spending. Selection of the next gap can be reproduced from the recorded ordering and prerequisites.
**Evidence:** initial reviewed gap register and rationale for the highest-priority independent item.
**Done when:** iterative work has a grounded queue rather than an unbounded instruction to make the atlas better forever.

### EXP-044 — Execute three complete improvement cycles
Status: todo
Depends on: EXP-043, VLK-080

**Files:** `docs/execution/cycles/`, affected implementation modules/tests, canonical task cards.
**Inputs:** a verified baseline release candidate and the prioritized gap queue.
**Build:** perform three bounded cycles: choose a supported gap; research primary evidence if needed; implement the smallest coherent improvement; run affected checks and browser tests; review data/source changes; commit; publish only when permitted and valid; and record the next queue. Do not manufacture low-value edits merely to fill a cycle count. Record actual commands, outcomes, scope changes and stopping reasons. An active session ending gets a resumable checkpoint, not a claim of continued work.
**Verify:** every cycle includes a concrete before/after, regression evidence and a real commit. Failed source/rights gates cannot be bypassed by synthetic records or silent scope reduction. Preserve all prior release guarantees.
**Evidence:** three cycle reports with linked commits, tests, source decisions and deployment result or exact blocker.
**Done when:** three useful verified cycles are complete and the next work is explicitly queued rather than falsely described as running in the background.

### EXP-045 — Add reviewable source refresh, diffs and rollback
Status: todo
Depends on: EXP-010, VLK-083

**Files:** `scripts/ingest/diff-release.ts`, `scripts/ingest/refresh.ts`, `.github/workflows/data-refresh.yml`, maintenance docs.
**Inputs:** locked sources, approved access paths and immutable prior release manifests.
**Build:** provide a dry-run refresh with changes grouped as additions, removals, modified claims, source conflicts, geometry changes, licensing changes and count shifts. Require review for schema/rights drift and unexpectedly large changes. Use manual dispatch by default; schedule only after provider policy and existing quota/storage permissions are verified. Do not automatically deploy unreviewed source changes. Keep the previous good manifest and a tested rollback path.
**Verify:** malformed inputs, token/PII leaks, new restrictive license rows, upstream downtime and suspicious mass deletion all fail safely. Purely changed retrieval timestamps must not masquerade as new source facts. Untrusted pull-request code receives no write credentials.
**Evidence:** dry-run diff, rejected-update fixtures, rollback rehearsal and least-privilege workflow review.
**Done when:** maintaining the atlas is reproducible and reviewable without sacrificing source integrity or silently creating an operational service.

### EXP-046 — Pass the complete expanded release matrix
Status: todo
Depends on: EXP-042, EXP-045, EXP-018, EXP-024, EXP-030, EXP-036, EXP-044

**Files:** `tests/e2e/expanded-release.spec.ts`, `docs/qa/expanded-release.md`, release manifests.
**Inputs:** all six domains, three modes, real data, completed cycles and production build at `/valkyrie/`.
**Build:** run baseline and expanded lint/type/schema/plan/data/unit/browser checks, independent orbit vectors, source audits, scale benchmarks and accessibility/resilience matrix. Exercise world→regional facility→sources, cable/IX/license, project/aggregate report, satellite/time, compare, story and fresh-link journeys. Reconcile actual counts, source dates and all remaining blockers with the release declaration.
**Verify:** use actual production chunks/workers/data paths, not only development mode. No skipped required check, increased budget, missing cohort or source-access failure may be described as passed. Distinguish functional, numerical, visual, performance and publication evidence.
**Evidence:** exact commit/data versions, commands, environment, results, screenshots, known limitations and release decision.
**Done when:** all required expanded gates pass, or the candidate stays explicitly incomplete with independent deliverables preserved.

### EXP-047 — Publish and package the factual full portfolio release
Status: todo
Depends on: EXP-046, VLK-089, VLK-094, VLK-086

**Files:** `README.md`, `docs/portfolio/`, actual screenshots/recording assets, deployment workflow and release notes.
**Inputs:** verified expanded candidate, clean-clone proof and actual public deployment access.
**Build:** publish through the existing authorized hosting path and test the final URL, workers, shards, routes, fresh shares and attribution. Create genuine screenshots of world/globe, regional infrastructure, cable/IX, Orbit, source inspector and mobile. Update the case study with the real architecture, source obligations, selected tradeoffs, achieved counts and measured results. Rehearse a 60–90 second demonstration. Video is optional; never claim a recording exists when only a script was written.
**Verify:** portfolio copy matches implemented behavior and actual dataset dates/coverage; source licenses and inspiration credit remain present. No fake uptime, usage, completeness, accuracy, business outcome or coding-duration claims. Publication blockers remain open when owner-only settings cannot be changed.
**Evidence:** verified URL, deploy commit/run, screenshot inventory, factual case study, demo script and clean-clone results.
**Done when:** the public showcase is real and its presentation can withstand an engineer checking the repository and sources.

### EXP-048 — Reconcile every task and deliver the final handoff
Status: todo
Depends on: EXP-047, VLK-096

**Files:** `docs/execution/STATUS.md`, `LOG.md`, baseline/expanded task cards, GitHub epic checklists and final release report.
**Inputs:** actual task evidence, repository history, release/CI results and remaining gap queue.
**Build:** reconcile 96 baseline and 48 expanded task statuses with their evidence and issue checkboxes. Separate completed reference audit, implemented app, imported/approved data, tested behavior, published deployment and portfolio assets. Keep the next improvement queue explicit. Stop at this handoff rather than asserting autonomous work will continue indefinitely. If the session ends earlier, record the exact ready next task and reproducible command without changing incomplete statuses.
**Verify:** both planning validators pass; every done task has done prerequisites and evidence; no blocked requirement is hidden by a closed epic. Final URLs and commit references resolve, and the README reports the actual full-target scope and limitations.
**Evidence:** final status table, real commit/data versions, test/deploy links, artifact inventory and unresolved owner-only actions.
**Done when:** Jordan can demonstrate the actual release and a future agent can resume from reliable repository state without guessing what happened.
