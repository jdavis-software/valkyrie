# E00 — Readiness and evidence

Goal: turn the written plan into verified implementation inputs without stalling on inaccessible references. No application feature is claimed complete by this epic.

### VLK-001 — Recover repository and freeze v1 scope
Status: todo
Depends on: none

**Files:** `docs/execution/STATUS.md`, `docs/execution/LOG.md`, `docs/PRODUCT.md`.
**Build:** inspect branch, working tree, existing files and issue state. Read the core specification shelf; record that global history plus two regional packs is the release boundary. Confirm no existing code is being overwritten. Keep optional work outside the default goal.
**Verify:** record actual `git status`, starting commit and selected task sequence. A clean planning baseline must not be described as an implemented app.
**Done when:** a recoverable execution entry names the starting branch/commit, assumptions and next task.

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

**Files:** `docs/REFERENCES.md`, local uncommitted browser notes.
**Build:** attempt public desktop/mobile browsing of Power Atlas, including search, category, selection and zoom behavior. Record observed versus inferred details, date and viewport. Preserve a precise blocker if browsing fails; the supplied written interaction contract remains sufficient.
**Verify:** every assertion in the observation ledger has visible evidence or is explicitly unverified. No source-code, data, image or proprietary asset copying.
**Done when:** transferable interaction principles and original Valkyrie treatments are documented, even if reference access is unavailable.

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
**Verify:** every required PRODUCT journey fits the layout; no generic fake KPI cards or borrowed branding. Record what counts as the active visual baseline.
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
**Build:** resolve contradictions among scope, data obligations, chosen versions and visual contract. Distinguish hard source blockers from nonblocking optional features. Record the selected first vertical slice and the no-backend/no-paid-provider constraints.
**Verify:** planning checker passes; prerequisites have evidence; no unresolved issue silently changes the v1 definition.
**Done when:** foundation work can proceed without repeated product/stack clarification and M0 status is accurately recorded.
