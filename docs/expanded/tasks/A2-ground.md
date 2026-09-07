# A2 — Global power, grid, compute and projects

All numerical cohorts are planned acceptance targets, not acquired counts. Use [source contracts](../IMPLEMENTATION.md). Do not manufacture records to make a region look complete.

### EXP-013 — Add an updated global power inventory and U.S. supplements
Status: todo
Depends on: EXP-012, VLK-026

**Files:** `scripts/ingest/adapters/gem.ts`, `eia860.ts`, `eia860m.ts`, `tests/data/power-adapters.test.ts`.
**Inputs:** approved pinned GEM release, EIA annual/monthly files and historical WRI crosswalk; exact URLs and file hashes from intake.
**Build:** import the complete eligible source partitions, not a hand-picked visual sample. Preserve units/phases, station relationships, technology/status vocabulary, AC/DC capacity meaning, dates and coordinate precision. Apply record-level license decisions before merging. Keep WRI-only records historical. Define EIA annual/preliminary precedence per field rather than overwriting everything with the latest download.
**Verify:** duplicate cross-source plants do not inflate counts; generator composites remain unique; unknown statuses remain unknown; exceptions and exclusions appear in the manifest. Audit ten records across technologies and priority regions against upstream rows.
**Evidence:** input hashes, mapping table, crosswalk decisions, exclusion report and output counts.
**Done when:** an approved recent-source global inventory is reproducible and clearly distinguishable from historical fallback coverage.

### EXP-014 — Expand grid packs to the priority regions
Status: todo
Depends on: EXP-012, VLK-038

**Files:** `config/regions.json`, `scripts/ingest/adapters/osm-grid.ts`, `tests/data/grid-regions.test.ts`.
**Inputs:** existing NoVA/DFW packs and approved bounded OSM/bulk inputs.
**Build:** add representative Frankfurt, Beijing and Mumbai deep-dive packs as documented design defaults. Select defensible bboxes after a tiny availability check and persist them; do not query whole continents through Overpass. Ingest lines/cables/substations, preserve raw voltage and OSM element identity, and handle cross-boundary/multipart geometry. Region coverage panels must name the actual extract boundary and source date.
**Verify:** each configured deep-dive pack has at least one real line and substation or remains explicitly blocked. Test relation holes, boundary crossings, multivoltage values, unknown voltage and duplicate nodes/ways. No inference of circuit connectivity or available capacity.
**Evidence:** small acquisition proof, bounded query/import logs, geometry tests and one inspected map selection per pack.
**Done when:** all five representative packs are usable and their limited coverage is visible rather than marketed as nationwide topology.

### EXP-015 — Expand compute facilities with evidence-backed AI enrichment
Status: todo
Depends on: EXP-012, VLK-047

**Files:** `scripts/ingest/adapters/compute.ts`, `src/domain/compute.ts`, `config/curation/ai-claims.json`.
**Inputs:** approved public facility records and primary operator/regulatory disclosures discovered during source intake.
**Build:** target at least 50 real compute facility/campus entities overall and at least one supported example in each priority region. Separate operators, owners, tenants, campuses, buildings and phases. AI-specific badges, demand, IT power or GPU claims require field-level primary evidence and a source date. A public cloud region is not automatically an exact data-center building.
**Verify:** aliases and repeated provider listings deduplicate appropriately; parent/child demand is not summed twice; map coordinates reflect stated precision; absent AI evidence produces a generic compute label. Exclude personal/security details.
**Evidence:** fifty-record cohort report or honest shortfall, ten manually reviewed profiles and source links for every AI-specific claim.
**Done when:** broader compute coverage is traceable and cannot masquerade as a comprehensive AI-capacity inventory.

### EXP-016 — Separate project, generation queue and large-load views
Status: todo
Depends on: EXP-012, VLK-052

**Files:** `scripts/ingest/adapters/queues.ts`, `large-load-reports.ts`, `src/domain/queues.ts`, `src/features/projects/`.
**Inputs:** approved Berkeley Lab queue download, current public load reports and primary project disclosures.
**Build:** define generation/storage/load/unknown queue roles, provider queue IDs, requested capacity, queue status, dates and location precision. Target at least 25 cited project/queue records across supported regions. Add aggregate-only load report objects where public sources protect customer information. Aggregates belong in coverage/report panels, not invented point markers. Relate a named load project only through a separate public supporting disclosure.
**Verify:** retired/withdrawn/operational statuses are not guessed from age; requested MW is not operating output; regional aggregate load cannot be converted into facilities or linked to guessed customers. Validate partial dates and source revisions.
**Evidence:** role mapping, actual cohort counts, aggregate-only fixtures and five source-to-UI traces.
**Done when:** project and queue exploration works while preserving the difference between proposed supply, proposed demand and published aggregates.

### EXP-017 — Unify international coverage and search
Status: todo
Depends on: EXP-013, EXP-014, EXP-015, EXP-016, VLK-042

**Files:** `src/features/regions/`, `src/features/search/normalization.ts`, `config/regions.json`.
**Inputs:** real ground releases and one canonical query protocol.
**Build:** expose World, US, Europe, China and India presets with actual dataset coverage and representative deep dives. Preserve Unicode/native-script names, supported aliases, source IDs and country codes. Build deterministic ranking without automatically translating proper names into invented identities. Keep a global search result selectable even when its detailed regional geometry is not yet loaded.
**Verify:** search exact native-script names and IDs, jump between regions, cancel stale fetches, handle absent details and restore prior state. Confirm result counts and map filters share the same semantic predicate. A region with no source coverage is not labeled zero infrastructure.
**Evidence:** at least ten reproducible cross-region search cases and per-region coverage snapshots.
**Done when:** international navigation and search are coherent and the UI clearly distinguishes broad inventory from local detail.

### EXP-018 — Review the complete ground-infrastructure release
Status: todo
Depends on: EXP-017, VLK-046

**Files:** `docs/qa/ground-release-audit.md`, release manifests, source notices.
**Inputs:** expanded power/grid/compute/project artifacts and source evidence.
**Build:** independently review representative records from every priority region and ground domain. Reconcile provider rows, canonical entities, map geometry and inspector facts. Test every source badge and declared coverage boundary. Record remaining source conflicts and shortfalls instead of hiding them in aggregate counts.
**Verify:** at least three real examples per ground domain, five regional transitions, a missing-data record and a known conflict case. Run data validation, query tests and a production-build browser flow. Validate the exact third-party notices in generated artifacts.
**Evidence:** reviewer checklist, selected record IDs, source URLs, commands/results and screenshot paths.
**Done when:** ground-domain gates pass with real evidence, or the release remains explicitly blocked with independent work identified.
