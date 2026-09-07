# Research findings — evidence versus design

Reviewed 2026-09-07 UTC. This is a technical reconstruction analysis and source-research memo. **It is not a completed rendered-site audit.**

## 1. What is actually established about Power Atlas

The public page reader returned the title, a World selector, a multi-entity search hint, five infrastructure category labels, a Filters label, a displayed count of 212,681 and zoom/navigation guidance. Reference: https://power-atlas.sarvesh-kapre.chatgpt.site/ . These are extracted text observations only. The count, working controls, actual geographic coverage, source panel and satellite behavior were not independently verified.

Jordan reports that the rendered application contains data-source disclosures. Treat this as an owner-reported interface feature until the panel has been inspected. Do not replace its inventory with a list of familiar geospatial providers.

The current isolated Chromium attempt failed before application loading with `net::ERR_BLOCKED_BY_ADMINISTRATOR`; it is not the owner's open in-app tab. No successful source-panel interaction or application network capture was obtained. Prior attempt evidence remains in [the reinspection report](../qa/POWER_ATLAS_REINSPECTION.md). An inaccessible browser is a limitation of this audit, not an application bug.

| Technical question | Current finding | Required evidence |
|---|---|---|
| Frontend framework and version | Unverified | Used production bundle/package signature, source map or creator source |
| Build system | Unverified | HTML/chunk conventions plus corroborating bundle/build metadata |
| Geographic renderer | Unverified | Executed library code/runtime artifacts; appearance is insufficient |
| CSS/components/state libraries | Unverified | Actual shipped/runtime evidence, distinguishing unused dependencies |
| Data providers | Unverified for this site | Source drawer and asset-level provenance, then representative payload trace |
| Backend/database | Unverified | Public API contract can show behavior, not automatically private database choice |
| Update frequency/live telemetry | Unverified | Dated snapshots, documented schedules and observed requests |
| Original GitHub repository | Not established | Direct attribution or deployment/source provenance, not a matching name |

## 2. Primary-source findings that materially change the design

**WRI is historical.** The repository says it is not maintained and identifies v1.3.0 as its last release. Its CSV data and Python code have different licensing. Retain it as a labeled baseline, not a current worldwide inventory. https://github.com/wri/global-power-plant-database

**GEM is a stronger current-source candidate, not yet an imported dataset.** Its integrated tracker describes units/phases, statuses, ownership and approximate locations, with an August 2026 release. Record the source granularity and tracker-specific inclusion thresholds. https://globalenergymonitor.org/projects/global-integrated-power-tracker/

**GEM can contain record-specific license exceptions.** The Solar Power Tracker specifically flags records with TransitionZero identifiers under a non-commercial license. A blanket provider-level permission is inadequate: check the selected download and row-level notices before publishing combined outputs. https://globalenergymonitor.org/projects/global-solar-power-tracker

**EIA inventory products differ.** EIA-860 is the detailed annual generator inventory; EIA-860M is a preliminary monthly supplement. Model plant and generator IDs and reporting periods explicitly; do not convert generator inventory into actual hourly output. https://www.eia.gov/electricity/data/eia860/ and https://www.eia.gov/electricity/data/eia860m/

**Grid features need coverage and database-license care.** OpenInfraMap documents its OSM-derived infrastructure and a MapLibre/PostGIS/vector-tile architecture. That proves OpenInfraMap's architecture, not Power Atlas's. OSM's copyright page governs ODbL attribution and data obligations. https://openinframap.org/about and https://www.openstreetmap.org/copyright

**PeeringDB is interconnection data, not AI capacity.** Its API supports object/relationship queries, selective fields, pagination and guest requests. Verify current access and terms on the exact dataset; omit personal contact objects. Facility presence does not prove GPU capacity, building demand or a dedicated fiber path. https://docs.peeringdb.com/api_specs/ and https://docs.peeringdb.com/

**Generation queues are not load queues.** Berkeley Lab's Queued Up concerns power plants seeking transmission interconnection. ERCOT's large-load documentation is a separate source family. ERCOT NPRR1267 explicitly explains that customer load information is confidential and published load data must be aggregated. Never synthesize facility locations from aggregate demand. https://emp.lbl.gov/queues and https://www.ercot.com/mktrules/issues/NPRR1267 and https://www.ercot.com/services/rq/large-load-integration/

**Public cable-map images are not a data license.** TeleGeography's current guidance distinguishes using map images from access to underlying databases. Its public FAQ also distinguishes public fields from subscriber capacity information. A public GitHub mirror or attractive route screenshot does not establish reuse rights. https://www2.telegeography.com/cite-telegeography-map and https://www2.telegeography.com/submarine-cable-faqs-frequently-asked-questions

**OMM-compatible JSON must be the orbital default.** CelesTrak documents explicit FORMAT queries, UTC/TEME/SGP4 conventions and the limits of legacy five-digit TLE catalog numbers. Preserve up to nine-digit identifiers without truncation; do not rely on the endpoint's default format. https://celestrak.org/NORAD/documentation/gp-data-formats.php

**Orbit ingestion must be centralized and polite.** Honor the current CelesTrak usage policy, retain last-known-good snapshots and do not issue provider requests from every visiting browser. Propagation of dated elements is a calculated position, not live telemetry. https://celestrak.org/usage-policy.php

**Globe does not automatically require a second ground-map engine.** MapLibre's current documentation includes globe/vector rendering and a projection-switching control. Use those capabilities for terrestrial mode, subject to production-version tests. https://maplibre.org/maplibre-gl-js/docs/examples/display-a-globe-with-a-vector-map/ and https://maplibre.org/maplibre-gl-js/docs/API/classes/GlobeControl/

**Large data need not require a live database service.** PMTiles documents archive-based tile retrieval using HTTP range requests. It is a candidate for layer-specific static delivery only after the selected host is tested. https://docs.protomaps.com/pmtiles/

## 3. Reconstructed architecture recommendation

Keep a React/TypeScript/Vite shell with imperative MapLibre rendering, worker-backed queries, lazy details, and versioned same-origin data. Use build-time acquisition and normalization, not provider calls tied to every map pan. Introduce an isolated, lazy orbital renderer only for the genuine orbital scene requirement. This is Valkyrie's proposed architecture, not a claim about the reference.

The hard engineering work is entity reconciliation and evidence, followed by rendering and interaction consistency. A map is not credible merely because it displays many points. Normalize facility/unit/campus/phase distinctions; retain conflicting dated claims; label uncertain geometry; keep relationships independent from geographic proximity; count logical records rather than rendered fragments.

## 4. Source-declaration versus source-execution ladder

For every reference source, record four independent findings: (1) named in UI; (2) linked from an asset; (3) representative payload lineage confirmed; (4) upstream record compared. Each step needs its own evidence. A CDN hostname does not identify the upstream publisher. A citation alone does not show whether data is fetched at runtime or bundled at build time.

The [source register](SOURCE_REGISTER.json) currently contains independently researched candidates only. All have `referenceRelationship: unverified`, no reference evidence and no imported records. The [audit protocol](REFERENCE_AUDIT.md) specifies how to replace those unknowns without inventing them.
