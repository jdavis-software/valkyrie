# E09 — Verification and measured quality

Goal: prove correctness, usability and maintainability without invented benchmark or test claims.

### VLK-073 — Complete domain and ingestion regression suite
Status: todo
Depends on: VLK-032, VLK-056

**Files:** domain/adapter/unit/integration tests and fixture notices.
**Build:** cover every contract invariant: IDs, units, nulls, dates, evidence, deduplication, geometry, publication atomicity and source parsing. Use small legally approved real samples plus clearly marked synthetic edge cases. Test bad-input rejection, not only happy-path transforms.
**Verify:** tests fail when representative invariants are intentionally broken in temporary fixtures; record coverage for domain/ingestion logic without treating a percentage as sufficient proof.
**Done when:** a dataset or adapter regression is caught before publication.

### VLK-074 — Verify data and bundle performance budgets
Status: todo
Depends on: VLK-040, VLK-048, VLK-064

**Files:** `scripts/check-budgets.mjs`, performance reports and optimization patches.
**Build:** measure actual compressed JS/data payloads, initial readiness, query latency and region switching under the documented profile. Optimize lazy loading, slim geometry, indexing and partitioning first. A tiled-layer migration needs measured evidence and an ADR.
**Verify:** enforce deterministic size limits in CI and record device-dependent timing separately. Never claim the reference's object count or a synthetic stress count as actual data scale.
**Done when:** shipped datasets meet the written budget or a justified measured amendment is explicitly approved/documented.

### VLK-075 — Complete UI and accessibility regressions
Status: todo
Depends on: VLK-065, VLK-066, VLK-067

**Files:** React component tests, axe/browser checks and manual checklist.
**Build:** cover accessible dialogs, search keyboard, pagination, inspector facts, comparison and story controls. Run automated accessibility scans on meaningful loaded states and inspect focus/contrast manually.
**Verify:** no known serious/critical automated violation on required flows; manual keyboard, reduced-motion and touch checks pass. Report untested assistive-tech configurations honestly.
**Done when:** accessibility checks are repeatable and guard future UI changes.

### VLK-076 — Check lifecycle, render and memory stability
Status: todo
Depends on: VLK-039, VLK-055, VLK-064

**Files:** stress/repetition browser specs and profiling notes.
**Build:** repeat region switches, searches, selections, story transitions and panel mount/unmount cycles. Inspect retained native listeners, workers, map instances, geometry buffers and caches. Use actual production data; label synthetic stress profiles separately.
**Verify:** no monotonically growing leak attributable to the app, stale states or freeze under the documented repeated-navigation scenario. Record observations rather than claiming exact cross-browser memory guarantees.
**Done when:** the application survives a real demonstration loop without degradation or accumulating resources.

### VLK-077 — Audit artifact, URL and dependency security
Status: todo
Depends on: VLK-032, VLK-046, VLK-070

**Files:** validation rules, dependency/security report and source notices.
**Build:** check source text is escaped, URLs are protocol/length validated, paths cannot traverse directories, artifacts contain no tokens/cookies/personal contacts, and dependency licenses/issues are reviewed. No raw HAR or private data belongs in the public repo.
**Verify:** malicious URL/text/manifest fixtures are rejected or safely rendered. Distinguish a scanner finding from confirmed exploitability; document unresolved release-blocking issues.
**Done when:** the public static artifact does not leak secrets or execute untrusted content.

### VLK-078 — Test navigation and persistence boundaries
Status: todo
Depends on: VLK-058, VLK-059, VLK-071

**Files:** URL codec/property tests and cross-context e2e scenarios.
**Build:** cover complete share-state round trips, history, comparison/story links, unknown IDs, schema migration, clipboard denial and saved-view corruption. Use bounded inputs and a fresh context without previous storage.
**Verify:** copied production-subpath links reproduce the same meaningful view; Back/Forward neither loops nor loses selected state; bad state recovers safely.
**Done when:** portfolio links are trustworthy and repeatable across browsers/sessions.

### VLK-079 — Run production end-to-end acceptance matrix
Status: todo
Depends on: VLK-073, VLK-074, VLK-075, VLK-076, VLK-077, VLK-078, VLK-072

**Files:** Playwright release suite and `docs/qa/release-candidate.md`.
**Build:** exercise all three primary journeys, every category, data/source errors, four layouts and the no-WebGL path against a built artifact under `/valkyrie/`. Inspect actual screenshots and application console health, not only test assertions.
**Verify:** VERIFICATION gate matrix passes with real data/version evidence; required failed/skipped checks remain explicit release blockers.
**Done when:** the application is a measured release candidate rather than a development-server screenshot.

### VLK-080 — Resolve findings and freeze candidate
Status: todo
Depends on: VLK-079

**Files:** bug fixes, regression tests and release-candidate report.
**Build:** prioritize correctness/data issues, blocked journeys, accessibility, then visual/performance defects. Fix root causes, rerun affected and full checks, and freeze the candidate commit/data release. Record acceptable minor limitations with rationale.
**Verify:** no known release-blocking defect remains; test results are tied to the actual candidate SHA and data version.
**Done when:** M4's local release candidate has a reproducible verified state.
