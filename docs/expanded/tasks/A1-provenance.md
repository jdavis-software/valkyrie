# A1 — Provenance and data contracts

Use [implementation contracts](../IMPLEMENTATION.md) and [candidate sources](../SOURCE_REGISTER.json). Research metadata is not an approved import. No public dataset has been imported by this plan.

### EXP-007 — Implement source intake and rights states
Status: todo
Depends on: VLK-017, VLK-020

**Files:** `src/domain/schemas/source.ts`, `config/sources.json`, `scripts/ingest/source-policy.ts`.
**Inputs:** independently researched register plus actual reference disclosures after EXP-004.
**Build:** implement candidate, reviewed, approved, imported and published stages with distinct source-disclosure evidence, access proof, exact input version/hash, coverage, terms and attribution. Support per-record exceptions and mixed-license partitions. Do not mark a source approved because its homepage loads. Keep credentials out of records and browser code.
**Verify:** reject approval without required access/license evidence, public publication of unreviewed records, and a claimed reference source with no observation. Test provider-level permission with a conflicting row-level restriction.
**Evidence:** schema tests and one tiny lawful source intake whose facts and review status are recorded.
**Done when:** source approval and reference attribution cannot be conflated and failed inputs cannot enter a release.

### EXP-008 — Reconcile cross-provider identities without flattening hierarchy
Status: todo
Depends on: VLK-018, EXP-007

**Files:** `src/domain/assets.ts`, `scripts/ingest/crosswalk.ts`, `config/crosswalks/`, `tests/data/identity.test.ts`.
**Inputs:** tiny real WRI/GEM/EIA/OSM examples plus clearly marked synthetic edge-case fixtures.
**Build:** preserve source IDs, entity kinds and parent/child relationships. Implement deterministic exact-match crosswalks and a review queue for ambiguous fuzzy matches. Keep generating unit versus station and data hall versus campus distinct. Store rejected match decisions so the next refresh does not re-propose the same error.
**Verify:** two nearby unrelated assets never merge automatically; equivalent provider records resolve consistently; a refresh preserves canonical IDs; parent capacity is not double-counted with children.
**Evidence:** crosswalk fixture table, test outcomes and audit of at least ten real matched/unmatched examples.
**Done when:** identity decisions are reproducible, reversible and do not inflate published entity counts.

### EXP-009 — Add field-level claims, conflicts and evidence types
Status: todo
Depends on: VLK-019, EXP-007

**Files:** `src/domain/claims.ts`, `events.ts`, `relationships.ts`, `tests/unit/claims.test.ts`.
**Inputs:** quantity/time/geometry rules in the implementation contract.
**Build:** model claims with semantic units, source ID, record ID, effective date/precision, retrieval time and resolution rationale. Keep conflicting observations rather than overwriting them by download order. Define physical, contractual, organizational, regulatory and proximity relationships separately. Represent aggregate-only records without point geometry.
**Verify:** null versus zero, MW versus MWh, AC versus DC, IT load versus facility demand, target versus actual date, old fact/new download, and unknown coordinates. A PPA fixture must not become a physical line.
**Evidence:** table-driven tests and inspector-ready conflict examples.
**Done when:** downstream views can explain the source and uncertainty of each claim without inventing precision.

### EXP-010 — Extend reproducible releases across all domains
Status: todo
Depends on: VLK-024, EXP-008, EXP-009

**Files:** `scripts/ingest/publish.ts`, `src/data/releaseLoader.ts`, `config/release-profile.json`.
**Inputs:** approved source partitions, schemas, crosswalks and baseline atomic publication.
**Build:** publish immutable manifests with hashes, byte sizes, per-kind/source/region counts, source versions, notices and failure/exclusion summaries. Keep raw/provider-derived outputs separated where license obligations require it; document obligations of combined search indexes. Publish the manifest only after all artifacts validate. Snapshot refresh must preserve the previous release on failure.
**Verify:** identical locked inputs produce identical content artifacts; an interrupted or invalid refresh cannot point clients at half a release; stale worker responses cannot mix release IDs; forbidden test data fails publication.
**Evidence:** reproducibility hashes and fault-injection tests.
**Done when:** a release can be rebuilt, audited and rolled back without upstream access at application runtime.

### EXP-011 — Define geographic coverage and count semantics
Status: todo
Depends on: EXP-010, VLK-025

**Files:** `src/domain/coverage.ts`, `config/regions.json`, `scripts/ingest/coverage-report.ts`.
**Inputs:** approved input coverage and configured world/US/Europe/China/India regions.
**Build:** store each source's bbox/region, temporal range, precision and known gaps. Separate catalog entities, source observations, renderable features, geometry fragments and aggregate reports. Partition catalog and geometry without changing IDs. Define counting at station/unit/campus granularity explicitly and exclude aliases, edges and tile fragments from the headline count.
**Verify:** overlapping tiles and boundary-crossing ways do not inflate counts; region toggles distinguish not-covered from zero records; a source aggregate without coordinates stays a non-map report.
**Evidence:** coverage matrix and reconciled counts from artifact manifest to query result to UI summary.
**Done when:** the interface can accurately explain what is mapped, missing, loaded and counted.

### EXP-012 — Establish six-domain real-data release tests
Status: todo
Depends on: EXP-008, EXP-009, EXP-010, EXP-011

**Files:** `tests/data/expanded-release.test.ts`, `scripts/validate-expanded-data.ts`, `docs/qa/data-audit.md`.
**Inputs:** tiny approved examples for each available domain and adversarial fixtures excluded from production.
**Build:** validate references, IDs, geometry bounds, units, dates, hierarchy, coverage, relationship evidence, licenses and secret/PII exclusion. Add source-version schema drift detection and clear quarantine reports. Require adapters to fail closed on unrecognized structures rather than treating malformed rows as empty valid releases.
**Verify:** duplicate IDs, orphan edges, mixed frames, invalid voltages, false source attribution, fabricated coordinates and disallowed rows produce nonzero validation. Missing optional facts do not discard valid assets unnecessarily.
**Evidence:** data audit, failing-fixture tests, release validation command and actual row counts.
**Done when:** subsequent adapters have a tested contract that blocks misleading public records.
