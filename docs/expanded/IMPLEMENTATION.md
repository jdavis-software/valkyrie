# Expanded implementation contracts

These are Valkyrie design decisions, not recovered Power Atlas internals. Paths and command names below are implementation targets. Use current compatible dependency documentation and pin the actual tested versions.

## 1. Modules and ownership

| Boundary | Intended implementation |
|---|---|
| Canonical domain | `src/domain/assets.ts`, `claims.ts`, `sources.ts`, `relationships.ts`, `events.ts`, `coverage.ts` |
| Runtime validation | `src/domain/schemas/`; shared with ingestion without browser-specific dependencies |
| Ground renderer | `src/features/map/MapAdapter.ts`, `layerRegistry.ts`, `projection.ts` |
| Orbit renderer | `src/features/orbit/OrbitAdapter.ts`, `orbit.worker.ts`, `clock.ts`, `frames.ts` |
| Query engine | `src/features/search/query.worker.ts`, `queryProtocol.ts`, `indexLoader.ts` |
| UI | `src/features/inspector/`, `sources/`, `compare/`, `stories/`, `timeline/` |
| State | `src/state/atlasState.ts`, `urlState.ts`, `savedViews.ts` |
| Acquisition | `scripts/ingest/adapters/`, `download.ts`, `normalize.ts`, `publish.ts` |
| Build configuration | `config/sources.json`, `regions.json`, `release-profile.json` |
| Published artifacts | `public/data/releases/<release-id>/`; immutable manifest, catalog/detail partitions, geometry, evidence and notices |
| Verification | `tests/unit/`, `tests/data/`, `tests/e2e/`, `tests/performance/`; real versus synthetic fixtures separated |

React owns application state and accessible controls, not one component per map point. MapLibre owns ground map/globe sources, layers, camera and picking. The orbital scene may use lazy-loaded Three.js because Earth-orbit geometry, depth and picking are a different rendering requirement; do not add deck.gl, Cesium and a second ground renderer simultaneously. Dispose/suspend the inactive renderer and its workers. Keep an architecture decision documenting this exception to v1's single-ground-renderer preference.

## 2. Entities, observations and relationships

Canonical entities include power station, generating unit, grid feature, substation, compute campus/facility, project, cable system, cable segment, landing place, IX, regulatory filing and satellite. Preserve hierarchy without claiming every source has the same granularity. An OSM way is a mapped feature, not proof of an entire circuit. A campus may have several buildings and phases.

Every entity needs a stable canonical ID, kind, names/aliases, source references, declared geometry/precision, relevant dates and evidence. Store raw provider IDs separately, including OSM element type and numeric ID, EIA plant/generator composite keys, cable IDs, PeeringDB object tags and NORAD catalog IDs as strings. Never truncate satellite IDs to five digits.

Model claims rather than overwriting conflicts: field, typed value, unit/meaning, source record, effective date/precision, retrieval date, status and resolution rationale. Later retrieval does not automatically make an old observation authoritative. A newer generator-level record cannot overwrite a plant-level total without a documented aggregation rule. Preserve alternative claims and crosswalk decisions. Use deterministic IDs and reviewed match decisions; proximity alone cannot merge different facilities.

Relationships are typed: ownership, operation, campus membership, documented physical connection, contractual agreement, peering/facility presence, cable landing membership, regulatory subject and geographic proximity. Each evidentiary relationship needs supporting references and dates. Nearby context is computed separately and visibly labeled. Never present a PPA as a physical cable/line, an IX membership as a dedicated route, or a satellite trajectory as a communications footprint.

## 3. Quantities, time and geometry

Keep `nameplateMW`, `netSummerMW`, `annualGenerationGWh`, `ITLoadMW`, `facilityDemandMW`, `storageEnergyMWh`, `voltageKV`, `designCapacityTbps`, `litCapacityTbps` and `orbitalAltitudeKm` semantically distinct. Known zero is not null. AC/DC solar nameplate distinctions survive normalization. Aggregating parent facilities plus child units is prohibited unless explicitly deduplicated. Totals always disclose cohort, date and missing values.

Use ISO timestamps for actual instants and explicit `day|month|year|unknown` precision for partial dates. Do not display January 1 as a fact when a source gives only a year. Events need `announced|target|observed|approved|withdrawn|operational` semantics; a license grant is not cable activation and a construction target is not completed construction. Historical map states require historical evidence; a timeline may show sourced events without inventing past inventory states.

Terrestrial GeoJSON is WGS84 `[longitude, latitude]`; record upstream CRS and transformations. Preserve multiline/polygon geometry, holes and antimeridian handling. Approximate city/region locations need a precision label; unknown locations stay unmapped. Never manufacture a precise parcel or a complete cable route from endpoint coordinates. A schematic link has `geometrySemantics: schematic`, dashed styling and a persistent label.

## 4. Source intake and release manifest

The research register is not the production registry. Promote a candidate only after proving access, fields, licensing, attribution, precision and an import on a tiny real sample. Save the selected source URL, dataset release, SHA-256, downloaded-at time, source observation coverage, parser version, inclusion rules, terms URL/date, license exceptions and sample audit. Do not fill provider forms with personal information, subscribe or acquire credentials without separate authorization.

A release manifest names immutable partition paths, byte sizes, hashes, schema versions, entity counts by kind, geographic coverage, source versions, applicable notices and excluded/failed sources. Artifacts are published atomically. A failed refresh retains the previous manifest and artifacts. Browser requests resolve through the manifest; no runtime Overpass, CelesTrak or other upstream fan-out. A clean clone builds from approved committed data or explicitly configured existing artifact storage, without requiring a fresh upstream scrape.

Acquisition is bounded: exact provider allowlist, response size cap, timeout, retry cap, cached downloads and compliant pacing. No global Overpass query. Start with small cells inside configured regions; move large bulk extraction to an approved documented bulk source. Relations and boundary-crossing ways need real geometry tests. Scraped metadata must not contain secret tokens or personal contact tables.

## 5. Per-domain acquisition recipes

**Power:** WRI provides historical continuity. Add a currently available approved GEM release and EIA inventory partitions. Keep unit/phase/station relationships, source status vocabulary, location precision and row-level terms. Deduplicate within comparable granularity, retain unresolved crosswalks rather than combining raw catalogs blindly. Report global coverage as the selected source's coverage, not every power asset on Earth.

**Grid:** Ingest OSM power lines/cables/substations from bounded regions, preserving type/id/version and original tags. Parse multiple voltage values without losing the source string. Unknown voltage remains an explicit filter state. Physical topology, available grid capacity and utility supply are outside the model unless directly documented.

**Compute:** Combine publicly mapped or published facilities with narrowly sourced operator/filing enrichment. Represent campus, operator, tenant and owner separately. AI-specific label, GPU count or demand needs field-level evidence. Exclude private addresses, personnel and sensitive operational/security details.

**Projects/queues:** Use source-specific queue identifiers and a `queueRole: generation|storage|load|unknown`. Berkeley Lab is not a load-queue substitute. Public aggregate load reports stay aggregate panels; never redistribute confidential submissions or reverse identify anonymized projects. Independently published facility/project facts may appear as separate cited records.

**Connectivity:** Model cable system, segments, landing places, IX, network presence and licenses separately. Verify actual geometry rights before drawing routes. When only endpoint facts are usable, show source-backed landing points and a clearly labeled schematic alternative; the exact-route requirement remains blocked rather than falsely passing. Source-provided capacity types remain separate.

**Orbit:** Prefer explicit OMM-compatible JSON. Use a current supported SGP4 library with pinned version and reference-vector tests; satellite.js is a researched candidate: https://github.com/shashwatak/satellite-js . Record catalog ID, epoch, time system, frame and propagation theory. Treat catalog membership, operational status and owner as separate evidence. Fetch curated communications groups centrally; deduplicate overlapping groups by NORAD ID and preserve the selected epoch.

## 6. Orbital coordinate and clock contract

The UI has a single UTC simulation clock: `now`, paused, or user-selected instant, with explicit playback speed. Positions are computed from dated elements. Convert propagated TEME state through the library's documented Earth-fixed/geodetic routines for the same timestamp; do not rotate an Earth-fixed scene a second time. Document renderer-axis mapping and kilometers-to-scene scaling. Test a known equatorial point, north pole, longitude sign and timestamp before attaching satellite positions. A spherical visual globe is not a claim of geodetic surface fidelity.

Numeric tests use published/reference SGP4 vectors with tolerances justified by that reference, plus cross-format input equivalence, out-of-range and propagation-error cases. Do not compare an implementation only against values produced by that same implementation. Render ground track separately from the 3D orbit path; break lines at the antimeridian and clip hidden geometry correctly.

Default product policies: warn when elements are older than 48 hours; disable automatic `now` playback beyond seven days and offer explicit epoch-demo mode. These are conservative interface defaults, not scientific guarantees of orbital accuracy. Store them in configuration and show the actual epoch/age. Never label a computed position as a live observation. Avoid risk, collision or operational navigation advice.

## 7. Rendering, query and performance contracts

Use one ground map instance. A layer registry defines canonical IDs, source, geometry kinds, ordering, minimum zoom, style, selectable behavior, attribution and count semantics. Use tiles/partitions for dense geometry, clusters for overview points and lazy detail loading. Never count `queryRenderedFeatures` fragments as unique catalog entities.

The query protocol includes request ID, release ID, normalized query/filter state and response revision. Discard stale worker, detail and region responses. Maintain one filter predicate for map, results and summaries. Search exact IDs first, then exact/alias names, then normalized prefixes/fuzzy matches with deterministic tie-breaking. Unicode names remain intact; unsupported transliteration must not corrupt source labels.

Engineering targets to measure, not existing benchmarks: initial ground-view JS/CSS at most 1.5 MiB compressed; initial required transfer at most 4 MiB; warm search p95 at most 150 ms desktop/300 ms mobile over 30 representative queries; first meaningful map target five seconds at documented 10 Mbps/100 ms RTT; no full detailed catalog loaded on initial view. Orbit code is lazy. If a justified budget is missed, file a measured optimization task; do not silently increase the limit.

Benchmark actual 200k-entity data separately from 500k synthetic stress fixtures. Record browser, hardware, viewport, network profile, dataset/version and sample count. Measure pan/frame behavior on a real supported GPU; do not report software-rendered CI as a user's Mac performance. Repeat 50 region/mode/selection cycles and check worker/listener/context counts and retained memory where the browser supports measurement. Start orbital display caps at 10,000 desktop/2,000 mobile rendered points, disclose subset rendering and keep search/catalog counts independent.

PMTiles requires correct range support (`206`, valid `Content-Range`, no forced full-archive fetch) on the actual host. If range delivery fails, use bounded static partitions under the same release contract, document the tradeoff and remeasure. Do not introduce paid object storage or a database just to escape a failed prototype.

## 8. UX and verification

Keep the established dark Valkyrie visual system, with readable original HTML controls. New modes reuse the shell, search, inspector, source badge and keyboard conventions. Search opens from the shortcut, exact result selection restores the correct mode, Sources is reachable from both global navigation and a selected asset, and browser history restores mode/filter/camera/time safely. Comparison rejects incompatible metrics instead of ranking them.

Required layouts: 1440×900, 1280×800, 768×1024, 390×844. Test keyboard-only, reduced motion, no WebGL, blocked storage, denied clipboard, offline-after-load, stale data, failed shard, worker crash and invalid URL. Orbit/ground mode switching must not leave a hidden renderer consuming a full animation loop. Attribute every displayed dataset in map and detail views.

Add command targets `pnpm data:validate`, `pnpm data:refresh --source <id> --dry-run`, `pnpm test:orbit`, `pnpm test:expanded`, and `pnpm perf:expanded` only after they actually exist. Preserve existing lint/typecheck/build/test commands. Each new command needs a documented deterministic fixture mode and meaningful nonzero failure. Synthetic fixtures must be impossible to include in the public release profile.
