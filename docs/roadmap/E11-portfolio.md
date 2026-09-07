# E11 — Portfolio and release handoff

Goal: a hiring reviewer sees an impressive working app and an honest explanation of Jordan's engineering decisions.

### VLK-089 — Write factual project README and About
Status: todo
Depends on: VLK-048, VLK-056, VLK-064

**Files:** README and About content.
**Build:** replace planning-only copy with implemented features, setup, actual stack, dated coverage, source limitations and inspiration credit. Add live link only after VLK-086 passes. Use actual counts from the release manifest. Clearly identify incomplete optional work and code-versus-data licensing.
**Verify:** every feature/scale/performance claim is backed by implementation or evidence; commands work from clean checkout.
**Done when:** the repository front page represents the real project, not the aspirational plan.

### VLK-090 — Write architecture and engineering case study
Status: todo
Depends on: VLK-080

**Files:** `docs/case-study.md`, final architecture diagram.
**Build:** describe the problem, actual design, data model, source normalization, rendering lifecycle, worker/search approach, tests, tradeoffs and measured improvements. Explain why static-first was enough and where it stops scaling. Disclose AI-assisted implementation without inventing author effort or business outcomes.
**Verify:** diagrams match current code and all measurements cite their recorded profile/report. No claim of recovering the reference's source.
**Done when:** a technical reviewer can understand the substantive engineering contribution.

### VLK-091 — Capture genuine portfolio screenshots
Status: todo
Depends on: VLK-072, VLK-089

**Files:** `docs/media/`, screenshot captions and README references.
**Build:** capture actual world, regional inspector/evidence, story and mobile states from the candidate app. Use readable dimensions and modest compressed assets. Preserve attribution and use real published data. Never substitute generated mockups as implementation proof.
**Verify:** inspect each image for clipped text, fake loading/errors, unsupported claims and private information. Record capture build/data version.
**Done when:** portfolio images honestly demonstrate the implemented product.

### VLK-092 — Produce demo script and optional actual recording
Status: todo
Depends on: VLK-061, VLK-091

**Files:** `docs/demo-script.md`, optional recorded media metadata.
**Build:** write a 60–90 second walkthrough with exact story/search subjects and click order, including one evidence inspection and one shared view. Record real video only if available tools support it; otherwise deliver the script/screenshots and state video was not recorded.
**Verify:** rehearse in a fresh browser; every click/subject exists and the script makes no invented claims. Keep video as an optional asset, not an excuse to block the core release.
**Done when:** Jordan has a reproducible concise demonstration without requiring explanation of the codebase first.

### VLK-093 — Assemble release evidence report
Status: todo
Depends on: VLK-080, VLK-088, VLK-089, VLK-090, VLK-091, VLK-092

**Files:** `docs/releases/v1-report.md`.
**Build:** record actual app/data versions, completed/blocked task counts, CI/browser/a11y results, measured performance profile, source coverage/missingness, licenses, screenshots, live URL and limitations. Separate automated from manual checks and tested from untested browsers.
**Verify:** links and artifact references resolve; no check is described as passed merely because it was specified in the plan.
**Done when:** release readiness is independently inspectable.

### VLK-094 — Run fresh-clone reviewer rehearsal
Status: todo
Depends on: VLK-093

**Files:** final defects/regressions and reviewer rehearsal notes.
**Build:** follow README from a clean checkout using only documented prerequisites and committed artifacts. Run checks/build and all three user journeys. Review the repo as a hiring manager: entry points, screenshots, claims, license separation and absence of unfinished junk.
**Verify:** no hidden local files, secrets, provider access or unpublished patches are needed; fix discovered issues and rerun the relevant gates.
**Done when:** both the application and developer-facing presentation work outside the original agent session.

### VLK-095 — Finalize release and issue reconciliation
Status: todo
Depends on: VLK-094, VLK-086

**Files:** changelog/release notes, task statuses and GitHub epic checklists.
**Build:** reconcile all completed task evidence, final source/app versions and issue checklists. Prepare or publish a release/tag only through existing owner-authorized tooling; if unavailable, leave an explicit release-publication note rather than a fake tag. Optional future tasks remain separate.
**Verify:** no required task is marked done while its gate is blocked; final README/live URL corresponds to the checked candidate.
**Done when:** the implemented v1 has a consistent auditable release record and accurate issue state.

### VLK-096 — Deliver the portfolio handoff
Status: todo
Depends on: VLK-095

**Files:** `docs/execution/STATUS.md`, final handoff in execution log.
**Build:** summarize branch/commit, live URL if verified, actual data coverage, completed versus blocked tasks, tests and browser checks, screenshots/case study/demo script, and exact remaining owner-only actions. State optional video/release-tag status separately.
**Verify:** final plan checker, clean working tree or documented remaining changes, and every release claim has evidence. Do not imply background work will finish later.
**Done when:** Jordan can showcase the real project with no ambiguity about what was built, tested, published or still missing.
