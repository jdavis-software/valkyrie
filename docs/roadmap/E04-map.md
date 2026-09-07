# E04 — Map engine and layer lifecycle

Goal: actual geographic rendering and selection, with stable lifecycle and no external map-service requirement.

### VLK-033 — Mount the local map safely
Status: todo
Depends on: VLK-013, VLK-025

**Files:** `src/features/map/MapHost.tsx`, map adapter and local style.
**Build:** lazy-load MapLibre, register the installed-version worker correctly, render local overview geography and map controls. Create/remove one native map per host. Use a flat projection first; enable globe only after it passes the same production tests.
**Verify:** production preview under `/valkyrie/`, correct worker requests, real visible geography, unmount cleanup and a usable non-WebGL alternative. No dependency on public demo tiles.
**Done when:** the actual browser renders the atlas background without console or worker errors.

### VLK-034 — Load real point data through a layer registry
Status: todo
Depends on: VLK-033, VLK-026

**Files:** map layer/source registry and data-layer adapter.
**Build:** connect approved world plant geometry to stable source/layer IDs. Keep source metadata separate from paint rules. Add category/type cues and a matching legend; use valid feature IDs for selection. A small interim published world-only release is acceptable before full release assembly.
**Verify:** sampled points correspond to known catalog IDs and coordinates; reload does not duplicate sources or listeners; attribution/coverage is visible.
**Done when:** real power assets render with correctly scoped counts and styles, not random demo markers.

### VLK-035 — Add clustering and zoom-aware detail
Status: todo
Depends on: VLK-034

**Files:** point layer configuration, cluster interaction helpers.
**Build:** cluster dense world points where useful, expand cluster clicks to the appropriate next zoom, reveal labels/details with deliberate thresholds and maintain category distinctions. Avoid one HTML/React marker per asset. Keep thresholds in configuration.
**Verify:** clusters expand predictably, count underlying assets correctly and preserve filtered semantics. Dense views stay interactive; keyboard users can reach the same assets through Results.
**Done when:** world-to-region navigation is readable without marker overload or hidden data-count errors.

### VLK-036 — Implement camera commands and safe viewport behavior
Status: todo
Depends on: VLK-034

**Files:** camera adapter and region navigation controls.
**Build:** support world reset, bounded region fit, selected-asset focus, panel-aware padding and settled-state camera reporting. Respect reduced motion. Handle missing geometry without calling map APIs with invalid coordinates.
**Verify:** opening an inspector keeps the selection visible; repeated region changes do not race; world/region bounds and disabled gestures behave on touch/keyboard.
**Done when:** navigation is intentional and camera state is not a per-frame React-render loop.

### VLK-037 — Implement hover, click and selection bridge
Status: todo
Depends on: VLK-035, VLK-036

**Files:** picking/event adapter, selected feature state and tooltip.
**Build:** route map selections into canonical IDs, distinguish cluster versus individual features, use feature-state for highlight and restore state after data/style reload. Tooltip text is escaped and click targets work without hover.
**Verify:** map→selection and results→map paths agree; duplicate rendered world copies select one asset; listener counts remain stable after repeated mount/unmount.
**Done when:** a real point can be selected reliably and inspected through at least a minimal data-backed development view.

### VLK-038 — Load regional lines, polygons and compute features
Status: todo
Depends on: VLK-034, VLK-032

**Files:** regional layer registry, geometry loaders and cancellation handling.
**Build:** load only enabled pack layers, style lines by documented fields without implying flow, render substations/facilities and retain representative-point precision. Abort stale region requests. Handle large/multipart features and declared boundaries.
**Verify:** switching packs/categories updates real geometry and notices; disabled layers release bounded caches as designed; delayed old requests never replace new region data.
**Done when:** all scoped geometry kinds work through the same lifecycle without a second renderer.

### VLK-039 — Harden geometry and lifecycle edge cases
Status: todo
Depends on: VLK-037, VLK-038

**Files:** map integration tests and geometry fixtures.
**Build:** handle antimeridian, world copies, polygons with holes, empty geometries, unknown selections, style reloads, context loss and aborted loads. Keep minimum zoom and paint changes stable. Use actual geometry IDs rather than indices.
**Verify:** run the specified edge-case fixtures and repeated navigation loops; no orphan listeners, duplicate sources, invisible selected state or blank-map regressions.
**Done when:** rendering correctness is demonstrated beyond the happy path.

### VLK-040 — Instrument initial map performance
Status: todo
Depends on: VLK-039, VLK-026

**Files:** map instrumentation, `docs/qa/map-baseline.md`.
**Build:** measure initial shell/map readiness, point/line payloads, interaction latency and approximate memory behavior using the actual approved release. Record device/browser/build/data version. Keep generated scale stress data separate and explicitly labeled.
**Verify:** capture traces for world load, regional load and repeated selection. Compare with VERIFICATION budgets without claiming cross-device guarantees.
**Done when:** there is a measured baseline and a concrete bottleneck list, not an unsupported large-scale performance claim.
