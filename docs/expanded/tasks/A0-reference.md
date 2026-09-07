# A0 — Reference and source discovery

These cards subdivide the unresolved VLK-003 audit. Follow [the 32-scenario protocol](../REFERENCE_AUDIT.md). A blocked navigation is not a completed observation. Keep source disclosure separate from independent provider research.

### EXP-001 — Establish a real reference session
Status: blocked
Depends on: VLK-001

**Files:** `docs/reference/<session>/manifest.json`, `observations.md`; local screenshot directory.
**Inputs:** exact Power Atlas URL and the actual browser tool/tab available in the implementation environment.
**Build:** attach to the authorized public tab, verify URL/title and meaningful rendered content, record UTC time/tool/viewport, and capture initial loading and ready states. Do not confuse an isolated Chromium session with the user's in-app browser. Current blocker: this conversation exposes no callable in-app browser controller; isolated Chromium is administratively blocked.
**Verify:** record a genuine visible control interaction and resulting state, not just an open URL or canvas element. Capture console observations and a readable full viewport. Stop repeated attempts after the same deterministic environment restriction.
**Evidence:** before/after captures and a manifest linking each image to its action; exact error when blocked.
**Done when:** Power Atlas actually renders and one real interaction is proven. A documented failure does not satisfy completion.

### EXP-002 — Inventory navigation, modes and layer controls
Status: todo
Depends on: EXP-001

**Files:** `docs/reference/<session>/controls.md`, `scenarios.json`.
**Inputs:** rendered session and REF-01–18 scenarios.
**Build:** traverse navigation, every exposed category/subcategory, all region options, filters and search paths. Record default versus changed state, count behavior, zoom thresholds, reset behavior and mode transitions. Expand hidden accordions and scroll/paginate controls. Mark absent controls only after actually reviewing their possible locations; do not invent a globe switch or satellite panel.
**Verify:** replay exact-name search, no-results search, keyboard selection, two region transitions and world-to-city zoom. Check that each capture follows a real action and has a unique evidence ID.
**Evidence:** control inventory with reproducible actions, screenshots and observed/not-present/failed/not-tested status.
**Done when:** all applicable navigation/layer scenarios have traceable results and untested paths are explicitly listed.

### EXP-003 — Audit representative asset inspectors
Status: todo
Depends on: EXP-002

**Files:** `docs/reference/<session>/inspectors.md`, `asset-traces.json`.
**Inputs:** assets actually discovered in each present domain, not assumed IDs.
**Build:** inspect one asset per present domain, plus contrasting cases where available: operating/planned, known/missing capacity, precise/approximate location. Open every inspector tab and expandable section. Record fields, units, relationship labels, source links, dates, compare/nearby actions and unsupported states. Follow relevant source citations through normal public browsing.
**Verify:** recover the same asset from search and map selection; compare visible identity and values. Confirm whether an apparent supply/ownership relationship has evidence or is merely proximity. Record unavailable domains rather than fabricating examples.
**Evidence:** before/action/after trace, exact asset identifiers, source URLs and field inventory with screenshots.
**Done when:** the inspector contract can be reconstructed from documented observations rather than generic geospatial assumptions.

### EXP-004 — Extract the entire visible data-source register
Status: todo
Depends on: EXP-001

**Files:** `docs/reference/<session>/source-disclosures.json`, `source-disclosures.md`.
**Inputs:** actual Sources/Data/Methodology panel and all nested views discovered in the session.
**Build:** capture every visible source row using all 18 fields in the audit protocol. Expand tabs, scroll the full panel, handle virtualized lists and pagination, and record the number of rows/pages reviewed. Distinguish display labels from final URLs, provider names from dataset editions, and source dates from download dates. Preserve exact URLs without secret query parameters.
**Verify:** reconcile the complete visible row count with extracted entries and spot-check at least three links plus an asset-level citation. Keep `listed-in-ui` separate from `payload-lineage` and `upstream-record-match`.
**Evidence:** panel captures, extraction manifest, documented coverage and unresolved rows.
**Done when:** the actually displayed source inventory is captured; an independently researched source list cannot pass this task.

### EXP-005 — Identify public runtime and delivery evidence
Status: todo
Depends on: EXP-001

**Files:** `docs/reference/<session>/technology-ledger.md`, `network-manifest.json`; sanitized local traces.
**Inputs:** normal public runtime during initial load, layer/region change, search, selection and source-panel opening.
**Build:** inspect delivered HTML/JS/CSS, workers, map styles/tiles, data schemas and request timing when tools expose them. Corroborate candidate library signatures with actual use. Record static versus requested data, lazy loads and storage behavior. If network tools are unavailable, record that limit while completing visible tests. Never infer a database from a URL or framework from styling.
**Verify:** every stack claim points to a captured public artifact or is labeled unknown. Review saved material for cookies, tokens, personal fields and signed URLs. Do not commit raw proprietary bundles or an unsanitized HAR.
**Evidence:** claim→artifact→certainty ledger and representative public delivery traces.
**Done when:** available public technical evidence has been assessed and unrecoverable internals remain explicitly unknown; a complete private architecture is not required.

### EXP-006 — Reconcile reference, owner brief and task coverage
Status: todo
Depends on: EXP-002, EXP-003, EXP-004, EXP-005, VLK-003

**Files:** `docs/reference/PARITY_MATRIX.md`, `docs/DECISIONS.md`, affected task cards.
**Inputs:** completed interaction/inspector/source inventories and Jordan's supplied six-domain brief.
**Build:** map each observed feature and each separately requested feature to task IDs, chosen Valkyrie behavior and acceptance checks. Identify original improvements and explicit deferrals. Record source additions from the actual drawer without claiming they are all approved for reuse. Resolve conflicts between baseline v1 and full target through this addendum, not silent omission.
**Verify:** no observed control or desired domain lacks a disposition; source rows link to review tasks; screenshot IDs resolve. Confirm VLK-003 has the required evidence before passing it. Do not use audit uncertainty to pretend the reference contains the desired brief.
**Evidence:** reviewed feature→evidence→task matrix, unresolved questions and signed-off design decision notes.
**Done when:** reference-informed requirements are traceable and the audit gate is genuinely satisfied.
