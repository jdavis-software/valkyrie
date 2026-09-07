# E06 — Infrastructure semantics and context

Goal: domain-specific interactions distinguish evidence, units and geographic association instead of offering generic misleading map popups.

### VLK-049 — Complete power-generation behavior
Status: todo
Depends on: VLK-044, VLK-026

**Files:** power facets, fact renderers and capacity selectors.
**Build:** display primary/secondary fuels where supported, source-period capacities and missing-value counts. Only total comparable nameplate MW from the current scope. Do not infer operating status or show an invented live generation chart.
**Verify:** cross-check sampled source values and filtered totals; mixed MW/MWh/unknown cases cannot produce misleading metrics.
**Done when:** the Power category is informative and explicitly historical where required.

### VLK-050 — Complete grid-specific inspection
Status: todo
Depends on: VLK-027, VLK-028, VLK-045

**Files:** grid fact renderer, voltage parser/display and geometry notes.
**Build:** show raw multi-value voltage/operator/circuit tags, optional tested derived voltage chips, mapped line/substation kind and coverage limitations. Distinguish underground power cable from telecom cable. Hide topology/supply claims not backed by data.
**Verify:** unit parsing and missing tags, multipart selection, boundary crossings and accurate legend labels. A visually crossing line does not create a node automatically.
**Done when:** grid details explain mapped infrastructure without pretending to know physical connectivity or spare capacity.

### VLK-051 — Complete compute-specific inspection
Status: todo
Depends on: VLK-029, VLK-047

**Files:** compute overview and evidence-backed classification helpers.
**Build:** display facility/campus granularity, location precision, raw/reviewed operators and supported facts. AI-specific labels require explicit evidence. Distinguish reported design demand from measured use; unsupported capacity and GPU information remain absent.
**Verify:** trace all specialized labels in the curated cohort to evidence; no duplicate campus/building headline count or automatic public-cloud ownership guess.
**Done when:** Compute gives genuine useful context without fabricated technical specifications.

### VLK-052 — Complete projects and date semantics
Status: todo
Depends on: VLK-030, VLK-045

**Files:** project inspector and source-event timeline.
**Build:** render dated source statements, stage, target versus actual dates and geographic precision. A simple ordered evidence timeline is required; do not interpolate construction progress or calculate completion probability. Unknown status stays unknown.
**Verify:** future targets, cancellation updates, year-only dates and conflicting sources are labeled correctly. Timeline order does not convert claims into verified history.
**Done when:** Projects tells an evidence-backed editorial story rather than an invented development database.

### VLK-053 — Complete connectivity-specific behavior
Status: todo
Depends on: VLK-031, VLK-045

**Files:** connectivity feature renderers and legend notes.
**Build:** distinguish facility, exchange organization and mapped route records. Expose evidence for relevant connectivity facts. If no approved physical route data exists, show real nodes and omit route metrics/controls; document this scope explicitly.
**Verify:** node membership never implies a particular cable path, bandwidth or latency. All route-like geometry is labeled actual/derived/schematic and licensed.
**Done when:** the category works honestly with the approved dataset rather than a visually fabricated network.

### VLK-054 — Separate evidence-backed edges from geographic context
Status: todo
Depends on: VLK-019, VLK-047, VLK-050, VLK-051

**Files:** relationship selectors, nearby-result schema and UI contract.
**Build:** define distinct containers/actions for documented relationships and approximate nearby geography. Document the exact origin/candidate representative-point method and available candidate coverage. Do not write derived nearby outputs back into canonical relationships.
**Verify:** a proximity match cannot satisfy a required evidence ID or appear under documented supply; a PPA remains a contract and does not create a physical line.
**Done when:** data structure and UI both enforce the semantic distinction.

### VLK-055 — Implement bounded nearby exploration
Status: todo
Depends on: VLK-054

**Files:** spatial helpers/index and nearby map/list components.
**Build:** find a bounded set of nearby approved candidate points, calculate documented approximate point-to-point distances and show method/precision warnings. Make the feature user-initiated. Candidate limits and distance cutoffs are configuration; no site suitability or infrastructure vulnerability score.
**Verify:** equal-point, antimeridian, missing location, coarse city points and regional-coverage boundary tests. Results remain distinct from documented relationships.
**Done when:** proximity provides useful visual context with honest limits and predictable performance.

### VLK-056 — Audit cross-layer semantics and counts
Status: todo
Depends on: VLK-049, VLK-050, VLK-051, VLK-052, VLK-053, VLK-054, VLK-055

**Files:** cross-layer tests and `docs/qa/domain-audit.md`.
**Build:** review real sample journeys across all categories for units, names, status, precision, dates, evidence and count granularity. Remove unsubstantiated UI language and confirm source/country coverage labels. Compare controls must know which quantities are compatible.
**Verify:** at least three sampled records per category and representative cross-source matches trace back correctly; zero known invented relationships or synthetic production fields.
**Done when:** the core explorer passes the data-integrity gate, not merely visual QA.
