# E03 — Real scoped data publication

Goal: an inspectable, legally attributed real-data cohort. Record targets are acceptance requirements, never permission to generate fake records.

### VLK-025 — Publish keyless overview geography
Status: todo
Depends on: VLK-021, VLK-024

**Files:** Natural Earth adapter, `public/geography/`, source notices.
**Build:** acquire and pin suitable low-resolution country/land geography; convert offline and validate rings, multipart features, country-code exceptions and antimeridian handling. Keep a small base map with documented resolution rather than a third-party tile dependency.
**Verify:** geometry validation, checksum/terms metadata and a size report. Countries lacking normal ISO codes are handled explicitly, not silently assigned invented values.
**Done when:** the app can render meaningful local world geography with provider networking disabled.

### VLK-026 — Publish historical WRI plant inventory
Status: todo
Depends on: VLK-021, VLK-024

**Files:** WRI adapter, world geometry/catalog/detail partitions.
**Build:** ingest a verified pinned release; retain plant IDs, fuels, capacities, location, raw owner/source text and dates. Default unsupported current status to unknown. Partition/simplify only as documented, retaining all valid records within budgets. Show archive limitations in source metadata.
**Verify:** sample original CSV rows against normalized records, null/zero cases, known-capacity totals and rejection counts. No arbitrary branch tip mislabeled as a release.
**Done when:** a real reproducible global inventory and honest historical coverage report exist.

### VLK-027 — Publish Northern Virginia grid pack
Status: todo
Depends on: VLK-021, VLK-024

**Files:** OSM grid adapter, `us-nova` pack and notices.
**Build:** query bounded cells within the planned bbox; retain lines/substations with source IDs, raw voltage/operator tags and geometry metadata. Deduplicate cell overlap and assemble relations correctly. Preserve licensed output separately from other providers.
**Verify:** at least one real line and substation; inspect original records and geometry overlay. No doubled assets at cell boundaries, fabricated connections or electrical capacity assumptions.
**Done when:** the regional pack is reproducible and its actual coverage/counts are published.

### VLK-028 — Publish Dallas–Fort Worth grid pack
Status: todo
Depends on: VLK-027

**Files:** `us-dfw` pack configuration/output and ingestion tests.
**Build:** reuse the grid adapter with only configuration changes. Validate bounded acquisition, source timestamps, geometry and pack association. Demonstrate that the pipeline is not hardcoded to the first region.
**Verify:** at least one real line/substation; overlapping/crossing features preserve IDs; actual data counts and payload sizes are recorded for both regions.
**Done when:** a second regional pack works through the same tested pipeline and licensing process.

### VLK-029 — Publish public compute facilities
Status: todo
Depends on: VLK-027, VLK-028

**Files:** compute adapter/curation, facility canonicalization records.
**Build:** acquire actual data-center records using verified tags/first-party facts; reconcile campus/building duplicates conservatively. Target at least ten real facilities across both packs. Retain coordinate precision and avoid inferred AI/GPU/power capacity fields.
**Verify:** trace ten selected records to original evidence, inspect derived polygon points and duplicate decisions, confirm missing facts remain null.
**Done when:** compute exploration has real subjects and the published count describes facilities at the declared granularity.

### VLK-030 — Curate dated infrastructure projects
Status: todo
Depends on: VLK-019, VLK-024

**Files:** `config/curation/projects.json`, project/evidence artifacts.
**Build:** curate at least five real projects from official sources. Capture publication date, source-reported stage, quantity semantics, location precision and a short original summary. Distinguish planned completion targets from actual commissioning.
**Verify:** every record has supporting URLs and fact-level evidence; city-only locations are labeled; no scraped article bodies/photos or guessed parcels.
**Done when:** the project collection is small, credible and explicitly editorial rather than an alleged complete pipeline.

### VLK-031 — Publish connectivity collection with honest geometry
Status: todo
Depends on: VLK-019, VLK-024

**Files:** connectivity adapter/curation and evidence artifacts.
**Build:** publish at least five real connectivity-specific records under approved terms. Distinguish exchange/facility/route types and organizational participation from physical links. Use mapped regional features or concise official factual curation; cable route imports remain rights-gated.
**Verify:** each subject has connectivity-specific evidence, correct type and actual/derived geometry labeling. No fictional arcs counted as physical cables.
**Done when:** Connectivity is a meaningful working category without a proprietary-data dependency.

### VLK-032 — Assemble and audit the first full data release
Status: todo
Depends on: VLK-025, VLK-026, VLK-027, VLK-028, VLK-029, VLK-030, VLK-031, VLK-023

**Files:** published release, manifest, `docs/data/release-audit.md`.
**Build:** combine approved partitions into one versioned release pointer while retaining each source's obligations and coverage. Generate unique counts, unknown-field counts, warnings and artifact checksums. Review combined catalog/index licensing explicitly.
**Verify:** all real-data targets, source notices, cross-record references and byte budgets pass; a production fixture-prefix scan finds zero synthetic records.
**Done when:** M2's data input is real and usable, with limitations documented rather than hidden.
