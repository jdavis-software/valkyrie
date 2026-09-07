# E00 — Readiness and evidence

Goal: turn the written plan into verified implementation inputs. No application feature is claimed complete by this epic. A blocked reference audit permits independent ready work, not a false audit/readiness pass.

### VLK-001 — Recover repository and freeze v1 scope
Status: todo
Depends on: none

**Files:** `docs/execution/STATUS.md`, `docs/execution/LOG.md`, `docs/PRODUCT.md`, `docs/qa/POWER_ATLAS_REINSPECTION.md`.
**Build:** inspect branch, working tree, existing files and issue state. Read the core specification shelf and latest supplied-brief comparison. Record that global history plus two regional packs is the current release boundary, not a full implementation of the broader Grok brief. Preserve explicit owner scope changes without silently promoting every future module. Confirm no existing code is being overwritten.
**Verify:** record actual `git status`, starting commit and selected task sequence. A clean planning baseline must not be described as an implemented app or completed reference audit.
**Done when:** a recoverable execution entry names the starting branch/commit, current scope, unresolved scope differences, assumptions and next task.

### VLK-002 — Validate the planning graph
Status: todo
Depends on: VLK-001

**Files:** `scripts/check-plan.mjs`, task cards and execution documents.
**Build:** implement or verify a zero-dependency Node checker for unique IDs, complete VLK-001–096 coverage, allowed statuses, existing prerequisites, cycle detection and relative Markdown links. Exclude proposed code paths inside fenced examples from link checks.
**Verify:** positive baseline plus deliberately duplicated ID, unknown dependency, cycle and broken-link tests in temporary fixtures. Never mutate real cards to test failures.
**Done when:** validation is deterministic, returns nonzero for malformed plans, and is documented for a planning-only checkout.

### VLK-003 — Inspect the reference without guessing internals
Status: todo
Depends on: VLK-001

**Files:** `docs/REFERENCES.md`, `docs/qa/POWER_ATLAS_REINSPECTION.md`, local sanitized browser evidence and reference-to-roadmap matrix.
**Build:** load the actual public Power Atlas application in a working browser and follow the complete walkthrough matrix in the reinspection report. Inventory every visible navigation/category/subcategory/filter and exercise representative search, selection, region, zoom, source, persistence, desktop/mobile and keyboard states. Inspect publicly delivered assets/network metadata for technical/source evidence when accessible. Separate rendered observations, text extraction, proposed requirements and unknown internals. Map observed features to VLK tasks, proposed extensions or explicit original-design deviations.
**Verify:** record browser/date/viewports and genuine before/after screenshots with reproducible interaction steps; inspect those screenshots. Every asserted behavior needs visible evidence. A successful page-text fetch, user-supplied prompt, error-page screenshot or empty browser log cannot pass this task. Missing private implementation details remain labeled unknown. No access-policy bypass, credentials collection or copying reference assets/code/data into the product.
**Done when:** the actual public-interface walkthrough and reference-to-roadmap comparison are evidenced, with limitations explicitly identified. If navigation is blocked, keep this task unfinished and record the blocker; do not pass M0. Only an explicit owner-approved waiver can replace the inspection requirement, recorded as a scope amendment and never represented as a completed audit.

**Known planning-stage blocker:** the fresh 2026-09-07 05:16 UTC Chromium attempt returned `net::ERR_BLOCKED_BY_ADMINISTRATOR`. See `docs/qa/power-atlas-reinspection-2026-09-07.json`. This is not a claim that the target site is unavailable from other environments. The task remains `todo` because application execution under the task graph has not begun; no completion was awarded for the planning-stage attempt.

### VLK-004 — Approve viable source and license paths
Status: todo
Depends on: VLK-001

**Files:** `docs/DATA_SOURCES.md`, initial `config/sources.json` decision notes.
**Build:** confirm current Natural Earth, WRI and OSM source/terms pages; inspect a small lawful sample and accessible download/query path. Record publication obligations separately from API access. Identify candidate official project/connectivity evidence. Do not assume optional providers are free to redistribute.
**Verify:** each required source has a viable acquisition/fallback and a terms decision, or an explicit blocker with independent work identified.
**Done when:** the team knows which data can actually be published; unknown rights are not silently approved.

### VLK-005 — Establish original visual contract
Status: todo
Depends on: VLK-003

**Files:** `docs/EXPERIENCE.md`, `docs/design/visual-contract.md`.
**Build:** specify desktop, laptop, tablet and mobile compositions; tokens, type, rail/inspector anatomy, category cues, keyboard focus and motion. Include initial, selected, search, story and empty states. Use an image concept only if available and useful; it is not a required paid dependency. A precise written contract is acceptable.
**Verify:** every required PRODUCT journey fits the layout; no generic fake KPI cards or borrowed branding. Record what counts as the active visual baseline. Do not approve final reference-informed design while VLK-003 remains unfinished unless the owner explicitly amended that dependency.
**Done when:** UI implementation has an original concrete target, not an unapproved claim of screenshot fidelity.

### VLK-006 — Prove stack compatibility
Status: todo
Depends on: VLK-001

**Files:** `docs/DECISIONS.md`, local disposable compatibility spike.
**Build:** select current stable compatible React/Vite/TypeScript/MapLibre/Node/pnpm versions. Test imports, MapLibre worker bundling, basic production build and `/valkyrie/` asset loading. Check installed-major docs; do not blindly paste older MapLibre configuration.
**Verify:** log exact versions, build command and a rendered production map or exact blocker. Keep the spike minimal and do not commit a second application.
**Done when:** foundation can pin a tested set of dependencies and known browser prerequisites.

### VLK-007 — Test domain feasibility on tiny real inputs
Status: todo
Depends on: VLK-004, VLK-006

**Files:** `docs/DATA_CONTRACTS.md`, reviewed source sample notes.
**Build:** map a few WRI/OSM records into proposed identity, geometry, quantity and evidence fields. Check source granularity, missing values, multi-voltage tags, area geometry and project precision. Record unsupported facts rather than inventing fields.
**Verify:** examples retain original IDs and distinguish city-level location, source-reported status and inferred display points. No unknown-to-zero conversion.
**Done when:** the schema is feasible for actual source shapes, with concrete changes documented before full ingestion.

### VLK-008 — Pass implementation readiness gate
Status: todo
Depends on: VLK-002, VLK-003, VLK-004, VLK-005, VLK-006, VLK-007

**Files:** `docs/execution/STATUS.md`, `docs/DECISIONS.md`.
**Build:** resolve contradictions among scope, data obligations, chosen versions and visual contract. Review the supplied-brief comparison and record any explicit scope amendments. Distinguish hard source/reference blockers from nonblocking optional features. Record the selected first vertical slice and the no-backend/no-paid-provider constraints.
**Verify:** planning checker passes; prerequisites have evidence; no unresolved issue silently changes the v1 definition. VLK-003 needs actual walkthrough evidence or an explicit owner-approved waiver, not an access-error report alone.
**Done when:** foundation work can proceed without repeated product/stack clarification and M0 status is accurately recorded. Do not label the bounded roadmap a complete reconstruction of the broader brief or original site.
