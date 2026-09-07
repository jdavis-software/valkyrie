# E08 — Responsive access and resilience

Goal: finished behavior across screen sizes, input methods and failure modes.

### VLK-065 — Complete four responsive layouts
Status: todo
Depends on: VLK-048, VLK-064

**Files:** shell/rail/inspector/compare/story responsive styles.
**Build:** validate 1440×900, 1280×800, 768×1024 and 390×844 compositions. Use appropriate rails/sheets rather than uniformly shrinking type. Respect safe areas, dynamic viewport height, map padding and scroll ownership. Preserve attribution and primary navigation.
**Verify:** actual browser screenshots and interaction loops at each size, including long names, expanded evidence, comparison and search keyboard.
**Done when:** no clipped controls, accidental horizontal page scroll, covered selections or unreadable text remain.

### VLK-066 — Complete keyboard and focus behavior
Status: todo
Depends on: VLK-065

**Files:** dialogs/sheets/search/results/map control semantics and tests.
**Build:** establish sensible tab order, skip-to-results, labels, focus trapping/restoration, Escape hierarchy and arrow/Enter search navigation. Ensure all data exploration is available without pointer-only map picking. Never intercept shortcuts while typing in unrelated fields.
**Verify:** keyboard-only discovery, story and sharing journeys; focus is visible and never lost behind overlays. Modal close returns to a valid trigger.
**Done when:** the atlas is usable as an application rather than an inaccessible canvas.

### VLK-067 — Complete contrast, touch and reduced-motion behavior
Status: todo
Depends on: VLK-065

**Files:** design tokens, map controls and motion preferences.
**Build:** test actual text/background contrast, non-color category/status cues, 44px primary touch targets, hover alternatives and cooperative map gestures. Respect reduced motion across camera, panels and stories without hiding essential information.
**Verify:** automated checks plus manual rendered inspection; touch scroll over a panel does not zoom the map, and no auto animation starts under reduced motion.
**Done when:** visual polish remains legible and comfortable across input/accessibility settings.

### VLK-068 — Add accessible results-first and announcement flows
Status: todo
Depends on: VLK-066, VLK-067

**Files:** result summaries, live-region announcements and no-map navigation.
**Build:** expose result counts, selection changes, source warnings and async errors to assistive technology without excessive announcements. Keep accessible pagination and evidence navigation independent of map rendering. Avoid requiring full table virtualization for the small visible result page.
**Verify:** inspect accessible names/roles and perform screen-reader-oriented manual checks; all primary journeys remain possible in Results.
**Done when:** accessibility is functional, not merely a passing color check.

### VLK-069 — Harden loading, cancellation and feature failures
Status: todo
Depends on: VLK-015, VLK-043, VLK-045

**Files:** loaders, worker client, app boundaries and retry UI.
**Build:** handle network timeout, invalid schema, missing detail, stale worker response, map initialization failure and unmount cleanup. Scope failures to the affected feature and make retries bounded. Retain previously loaded valid content where appropriate.
**Verify:** inject each error and race; no infinite spinners, unhandled rejection, unrelated stale inspector or blank app.
**Done when:** predictable failure messages/actions cover the documented async states.

### VLK-070 — Implement snapshot health and offline degradation
Status: todo
Depends on: VLK-024, VLK-069

**Files:** source-health state and offline/error indicators.
**Build:** distinguish a historical/stale source from a failed fetch and a browser offline event. Already loaded views remain usable after disconnect; unloaded shards report unavailable. Do not promise cold-start offline support unless a tested cache strategy is explicitly implemented.
**Verify:** disconnect after world load, after regional load and before a new detail; recover when networking returns without pretending all data was cached.
**Done when:** the UI explains what remains available and never silently replaces real data with fake fallback records.

### VLK-071 — Recover malformed URLs and local state
Status: todo
Depends on: VLK-058, VLK-059, VLK-070

**Files:** URL/storage recovery components and migration tests.
**Build:** handle invalid enums, extreme coordinates, unknown release/asset IDs, corrupted saved records and denied storage. Bound parsing work and show a reset/recover path. Do not execute arbitrary redirect destinations or render user-entered HTML.
**Verify:** hostile/malformed fixtures cannot crash the app, leak data, create unbounded memory work or overwrite valid saved views unnecessarily.
**Done when:** a bad link or local record cannot brick the portfolio demo.

### VLK-072 — Pass responsive and resilience review
Status: todo
Depends on: VLK-068, VLK-069, VLK-070, VLK-071

**Files:** `docs/qa/accessibility-resilience.md`, browser evidence.
**Build:** run the complete target-state matrix and repair discovered failures. Document browser/tools, viewports, manual checks and any limitations. Separate automated accessibility results from manual screen-reader/browser review.
**Verify:** all required journeys and recovery paths pass at applicable sizes; remaining material issues stay open rather than being hidden in a favorable summary.
**Done when:** M3 has actual responsive, keyboard and failure-mode proof.
