# A4 — Satellite and orbital exploration

This is calculated visualization from dated orbital elements, not live spacecraft telemetry. Read the UTC/frame/epoch contract in [implementation requirements](../IMPLEMENTATION.md). Source access, library compatibility and numerical correctness are separate gates.

### EXP-025 — Acquire validated OMM-compatible catalog snapshots
Status: todo
Depends on: EXP-007, VLK-021

**Files:** `scripts/ingest/adapters/celestrak.ts`, `src/domain/schemas/orbit.ts`, `config/orbit-groups.json`.
**Inputs:** currently documented CelesTrak GP endpoint and usage policy, a small approved communications-group sample and a pinned acquisition configuration.
**Build:** explicitly request JSON rather than relying on the provider default. Preserve NORAD IDs as strings supporting nine digits, source group membership, UTC element epoch, reference frame and propagation theory. Validate required numeric fields and units. Deduplicate overlapping group snapshots by canonical ID with a documented epoch-selection rule. Perform bounded centralized acquisition with caching, compliant pacing, retry limits and last-known-good preservation. Do not fetch upstream catalogs from each visitor's browser.
**Verify:** test six/nine-digit IDs, mixed group duplicates, malformed/empty responses, invalid epoch, nonfinite fields, unsupported theory and interrupted refresh. A valid old snapshot remains usable as an explicitly dated snapshot, not automatically current data.
**Evidence:** exact provider query, policy review, input hash, actual object count, normalization tests and excluded-record report.
**Done when:** an approved real catalog is reproducibly published with enough metadata to evaluate age and propagation compatibility.

### EXP-026 — Implement a numerically verified propagation worker
Status: todo
Depends on: EXP-025, VLK-042

**Files:** `src/features/orbit/orbit.worker.ts`, `frames.ts`, `orbitProtocol.ts`, `tests/unit/sgp4-vectors.test.ts`.
**Inputs:** pinned supported SGP4 library, published independent reference vectors, validated JSON elements and the shared request/release protocol.
**Build:** implement timestamped batch propagation and documented TEME-to-Earth-fixed/geodetic conversion. Keep one UTC clock, explicit kilometer/radian units and an isolated renderer-axis conversion. Return typed arrays plus canonical IDs, timestamp and release/revision; discard stale results and expose per-object errors. Use the library's installed-version JSON/OMM support rather than serializing new large IDs into truncated TLE lines.
**Verify:** compare against independent published vectors with documented tolerances, equivalent representable TLE/JSON inputs and large-ID JSON-only fixtures. Test longitude sign, poles, date-line, UTC conversion, invalid/decayed elements, stale batches and worker restart. Do not validate only against values computed by the same code under test.
**Evidence:** reference-vector provenance, exact versions, numeric error results and worker failure tests.
**Done when:** coordinate/time correctness and error handling are demonstrated independently of the appearance of the globe.

### EXP-027 — Build an isolated lazy-loaded orbital scene
Status: todo
Depends on: EXP-026, EXP-031

**Files:** `src/features/orbit/OrbitAdapter.ts`, `OrbitViewport.tsx`, `picking.ts`, `sceneLifecycle.ts`.
**Inputs:** verified Earth-fixed positions, shared selected IDs and mode lifecycle contract.
**Build:** lazy-load the orbital renderer only on Orbit entry. Render original Earth geometry, batched satellite points and the selected orbit path at consistent scale; depth-test hidden objects and implement picking without a React/DOM marker per satellite. Keep the Earth-fixed globe stationary relative to Earth-fixed positions to avoid a second rotation. Suspend or dispose the ground renderer and workers when not needed. Use a disclosed render subset/cap while search retains the full catalog.
**Verify:** test equatorial/north-pole landmarks, front/back picking, selected-path identity, repeated mode entry/exit, resize, device-pixel-ratio limits and context loss. Selecting a hidden or invalid object must not silently select a different one. Reduced motion disables ornamental rotation.
**Evidence:** actual production scene captures, coordinate sanity checks, renderer/worker lifecycle counts and picking tests.
**Done when:** the scene is interactive, spatially consistent, lazy and independently disposable rather than an always-running decorative globe.

### EXP-028 — Add orbit search, constellation and time controls
Status: todo
Depends on: EXP-027

**Files:** `src/features/orbit/controls/`, `clock.ts`, `groundTrack.ts`, inspector components.
**Inputs:** real group membership, canonical catalog IDs and validated simulation time.
**Build:** provide UTC date/time, Now, pause/play and explicit speed controls; searchable satellite IDs/names; group/constellation selection; source epoch and position timestamp. Distinguish group membership from confirmed operator/operational status. Draw a selected ground track separately from a 3D orbit path, breaking antimeridian jumps. Preserve terrestrial exploration state on entry and restore it on exit. Time scrubbing cancels obsolete propagation batches.
**Verify:** test exact-ID selection, grouped duplicates, keyboard controls, paused time, rapid scrubbing, UTC boundaries, time restoration and unloaded catalog failure. Ground tracks must not be advertised as communications footprints or visibility guarantees.
**Evidence:** complete search→select→pause→scrub→source→exit journey and deterministic timestamp fixtures.
**Done when:** orbit mode is a usable educational explorer with clear time semantics and recoverable navigation.

### EXP-029 — Enforce element-age and stale-catalog behavior
Status: todo
Depends on: EXP-025, EXP-026, EXP-028

**Files:** `src/features/orbit/freshness.ts`, `config/orbit-policy.json`, source-health/inspector components.
**Inputs:** element epochs, retrieval/publication times and configured display policies.
**Build:** show actual element age separately from download age and calculated-position time. Start with warning beyond 48 hours and disable automatic Now playback beyond seven days, offering an explicit epoch-demo mode. These are product safety/display defaults, not scientific accuracy guarantees. Show propagation errors and omitted-object counts. Preserve stale snapshots for reproducibility without making them appear freshly observed.
**Verify:** future/missing epochs, mixed-age catalogs, stale-to-fresh refresh, offline reload, timezone changes and single-object failures. Disallowed Now mode cannot be re-enabled accidentally by URL restoration. Failed objects never fall back to zero coordinates or fabricated orbital motion.
**Evidence:** boundary-condition tests and actual fresh/stale/error interface captures.
**Done when:** the app never confuses fresh retrieval, aged elements, calculated position and live observation.

### EXP-030 — Pass orbital science and browser acceptance
Status: todo
Depends on: EXP-028, EXP-029

**Files:** `tests/e2e/orbit.spec.ts`, `tests/unit/orbit-regressions.test.ts`, `docs/qa/orbit-validation.md`.
**Inputs:** independent propagation reference tests, actual approved catalog and production preview.
**Build:** consolidate numerical, format, coordinate, time, error and interaction regressions. Audit at least five real objects across available regimes/groups without assuming all desired regimes exist. Document the numerical reference standard and limitations separately from visual accuracy. Exercise projection/mode switches, keyboard, mobile, context loss, catalog failure and pause/scrub behavior.
**Verify:** all independent reference tests pass within justified tolerances; large-ID data works without TLE truncation; date-line/polar tracks render safely; invalid objects remain excluded with explanation. Test a stale release without contacting CelesTrak from the browser. No collision, coverage, navigation or operational-accuracy claim is introduced.
**Evidence:** exact versions/epochs, error measurements, real object IDs, screenshots and browser results.
**Done when:** both numerical correctness and the visible orbital journey have evidence, with residual scientific/data limitations clearly disclosed.
