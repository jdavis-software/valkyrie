# A5 — Globe, delivery and scale

The target is a smooth explorable atlas, not a giant initial download. Keep actual catalog scale separate from geometry fragments and synthetic stress fixtures. Budgets in [implementation contracts](../IMPLEMENTATION.md) are requirements to measure, not claimed results.

### EXP-031 — Implement native ground-map and globe switching
Status: todo
Depends on: VLK-033, VLK-039, EXP-006

**Files:** `src/features/map/projection.ts`, `MapAdapter.ts`, `src/state/viewMode.ts`.
**Inputs:** the installed MapLibre version's documented projection APIs and the completed reference-to-design matrix.
**Build:** implement explicit Map and Globe controls within the existing atlas shell. Preserve canonical selection, enabled layers, filters and meaningful geographic focus. Define projection-specific zoom/pitch limits and safe polar behavior; do not promise identical camera values across different projections. Provide reset orientation and reduced-motion transitions. Keep MapLibre as the single ground renderer; the separate Orbit mode has its own lifecycle contract.
**Verify:** production worker/bundle loading under `/valkyrie/`, selection continuity, date-line/polar navigation, repeated switching, unavailable globe support and keyboard operation. Avoid undocumented private transform APIs and effects that recreate the map on every state change.
**Evidence:** documented compatibility decision, projection-state tests and before/after production captures.
**Done when:** both projections genuinely work and transitions preserve the user's exploration context without leaking resources.

### EXP-032 — Publish bounded geometry tiles and catalog shards
Status: todo
Depends on: EXP-011, VLK-038

**Files:** `scripts/ingest/partition.ts`, `tile-build.ts`, `src/data/geometryLoader.ts`, manifest schemas.
**Inputs:** real approved geometry partitions, measured baseline payloads and the actual chosen static host.
**Build:** partition dense geometry and details independently. Introduce PMTiles/vector delivery for the layers that need it, with canonical IDs and zoom-appropriate geometry; retain bounded GeoJSON for small layers. Test actual HTTP range support and avoid whole-archive downloads disguised as range loading. Use documented static shard fallback when hosting cannot deliver ranges; do not purchase storage or silently add a backend.
**Verify:** source geometry membership survives simplification, holes/date-line paths remain valid, boundaries have no missing assets and duplicate tile features do not inflate entities. Assert valid 206/Content-Range for archive mode, hashed immutable URLs, bounded initial transfer and cancellation.
**Evidence:** actual host/network tests, before/after byte measurements and manifest-to-render ID checks.
**Done when:** large geometry loads on demand with measured bounds and verified host compatibility or a documented tested fallback.

### EXP-033 — Scale search and lazy details independently of the map
Status: todo
Depends on: EXP-032, VLK-042

**Files:** `src/features/search/indexLoader.ts`, `query.worker.ts`, `queryProtocol.ts`, `src/data/detailLoader.ts`.
**Inputs:** normalized lightweight catalogs, canonical filter predicates and detail partitions.
**Build:** load searchable metadata separately from geometry and full claims. Use deterministic exact-ID/name/alias ranking, worker requests keyed by release/revision, bounded caches and lazy detail acquisition. Page/virtualize results and expose coverage/loading state. Never send full geometry arrays across the worker bridge per keystroke. Changing a release invalidates incompatible results and detail cache entries atomically.
**Verify:** 30 representative queries across domains/regions, stale-response races, rapid filter edits, cache eviction, missing shard, worker crash and very long/Unicode queries. Search remains usable without WebGL. No hidden hard cap may silently drop matching catalog entries.
**Evidence:** measured warm-query p95, index/detail sizes, race-condition tests and no-WebGL journey.
**Done when:** large-catalog search is correct, bounded and independent of map-rendered subsets.

### EXP-034 — Bound GPU work and cross-mode lifecycle
Status: todo
Depends on: EXP-031, EXP-032, EXP-027

**Files:** `src/features/map/layerRegistry.ts`, `src/features/orbit/sceneLifecycle.ts`, `src/performance/`.
**Inputs:** actual ground/orbit renderers and approved datasets.
**Build:** batch point/line rendering, avoid per-feature DOM nodes, cap device pixel ratio, and apply explicit label/zoom and orbital point budgets. Suspend inactive animation loops, workers and event handlers. Treat catalog inclusion and rendered density as different concepts and show any display subset. Use meaningful selection overlays without repainting every feature on hover.
**Verify:** repeat 50 map↔globe↔orbit/region/selection cycles; inspect WebGL context, worker and listener counts, memory where supported, frame behavior and hidden-tab pause. Inspect real supported hardware for user-performance claims; software CI is not a Mac/GPU benchmark.
**Evidence:** device/browser/profile, cycle log, CPU/GPU observations and actual retained-resource checks.
**Done when:** interactions stay usable without accumulating active renderers or misleading users about display subsets.

### EXP-035 — Benchmark actual large catalogs and synthetic stress separately
Status: todo
Depends on: EXP-013, EXP-014, EXP-032, EXP-033, EXP-034

**Files:** `tests/performance/expanded.spec.ts`, `scripts/perf/report.ts`, `docs/qa/scale-benchmark.md`.
**Inputs:** current approved real release and clearly isolated deterministic 500,000-record stress fixtures.
**Build:** assess the planned 200,000-distinct-entity release target using typed entity counts and deduplication audits. Measure initial assets/transfer, first meaningful map, warm queries, region/mode changes and selected details. Report actual achieved data scale if the target is not met. Stress fixtures test capacity only and are excluded by production validation.
**Verify:** document hardware/browser, viewport, network profile, release ID and sample sizes. Reconcile unique entities with per-type/source counts; exclude aliases, observations, edges and tile fragments. Budget misses create measured optimization work, not quietly raised limits or fabricated benchmark outcomes.
**Evidence:** raw measurements, reproducible commands, real-versus-synthetic labels and dataset-count audit.
**Done when:** scale claims are supported by real records and measured behavior; unmet required targets remain explicitly open.

### EXP-036 — Verify scaled loading and degraded-mode recovery
Status: todo
Depends on: EXP-035, VLK-068, EXP-030, EXP-024

**Files:** `tests/e2e/expanded-failures.spec.ts`, `src/data/recovery.ts`, `docs/qa/scale-resilience.md`.
**Inputs:** production release, all three view modes and fault-injection fixtures.
**Build:** handle missing/corrupt geometry shards, failed range requests, index/detail errors, worker crashes, context loss, slow network and offline-after-load. Preserve usable results/details and last-known-good state. Retry is bounded and targeted to the failed component. Never claim cold-start offline operation unless separately implemented and tested.
**Verify:** fail each dependency independently, cancel rapid region changes, restore a stale URL, switch out of broken Orbit mode and recover without duplicate contexts. Confirm attribution, source dates and explicit missing-coverage messages survive failures. Catalog counts cannot silently shrink to whatever loaded successfully.
**Evidence:** fault matrix, automated tests, visible recovery captures and unexplored browser limits.
**Done when:** failures at realistic scale are understandable and recoverable rather than blank maps or false empty datasets.
