# E07 — Signature portfolio interactions

Goal: make the product memorable through useful interaction, not decorative fake intelligence.

### VLK-057 — Implement compatible asset comparison
Status: todo
Depends on: VLK-048, VLK-056

**Files:** compare state/view and quantity compatibility selectors.
**Build:** allow two to four records, add/remove/clear actions, readable shared identity fields and only compatible quantitative comparisons. Preserve unknown values and source dates. Mixed asset kinds can compare geography/evidence, not rank unlike capacity concepts.
**Verify:** same-kind and mixed-kind tests, missing measures, max selection, keyboard navigation and mobile overflow semantics.
**Done when:** comparison is a real analytical interaction with no invalid numerical ranking.

### VLK-058 — Implement versioned shareable URL state
Status: todo
Depends on: VLK-014, VLK-048

**Files:** `src/features/sharing/url-codec.ts`, history synchronization.
**Build:** encode region/layers/filters/selection/compare/camera/story through a bounded v1 schema. Preserve the static base path. Use push versus replace intentionally; validate inputs before applying and clamp camera values.
**Verify:** round-trip/property tests, malformed and oversized queries, unsafe URLs, unknown IDs and Back/Forward state restoration. Fresh private-browser links need no local storage.
**Done when:** a copied URL reliably reproduces a meaningful view without a backend.

### VLK-059 — Implement local saved views
Status: todo
Depends on: VLK-058

**Files:** saved-view repository and UI.
**Build:** save named bounded view records in versioned localStorage, list/open/delete them, handle schema migration and offer explicit reset for corrupted data. Keep storage failures nonfatal and never store provider tokens or whole datasets.
**Verify:** unavailable storage, quota error, corruption, old schema, duplicate names and private mode. User-entered names render as text.
**Done when:** local persistence works predictably without implying cloud sync.

### VLK-060 — Author and validate three real stories
Status: todo
Depends on: VLK-032, VLK-046

**Files:** `config/curation/stories.json`, story schema/validator.
**Build:** select actual evidence-backed subjects for the three themes in EXPERIENCE. Each story has 4–6 deterministic steps, original concise copy, source-supported claim IDs, valid subjects, camera/filter state and caveats. Avoid hardcoded unsupported statistics.
**Verify:** all subject/evidence IDs resolve in the pinned release, target cameras match real geography and every factual sentence has support.
**Done when:** story content is complete and auditable before animation work begins.

### VLK-061 — Implement deterministic story playback
Status: todo
Depends on: VLK-060, VLK-058

**Files:** story player/state transitions and camera bridge.
**Build:** add Next/Previous, step count, pause/play, source links, deep links and Exit restoring the prior explore state. Manual navigation is default; optional autoplay is user-initiated and reduced-motion aware. Cancel previous camera/data transitions on rapid step changes.
**Verify:** forward/back, pause/resume, direct step URL, early exit, missing subject failure and slow regional load. Story controls remain keyboard accessible.
**Done when:** the three stories provide a smooth reproducible demonstration of real app behavior.

### VLK-062 — Refine story visual composition
Status: todo
Depends on: VLK-061

**Files:** story panel layouts, motion tokens and visual QA notes.
**Build:** ensure text never covers the selected geography, step cards remain readable on all layouts and transitions use the same design system. Keep factual copy native HTML. Do not add decorative energy-flow animations that imply unverified electrical behavior.
**Verify:** inspect each step at desktop/mobile and reduced motion; compare against the active original visual contract and fix actual composition issues.
**Done when:** stories feel deliberately designed rather than a slideshow pasted over a map.

### VLK-063 — Add cohesive sharing and recovery controls
Status: todo
Depends on: VLK-057, VLK-058, VLK-059

**Files:** share dialog, copy fallback, saved/compare navigation.
**Build:** expose Copy link, save/open view and clear comparison with feedback that reflects actual success. If clipboard permission fails, present selectable link text. Reset actions state exactly what they reset and preserve unrelated state.
**Verify:** denied clipboard, keyboard-only use, mobile sheet transitions and a comparison link opened in a fresh context.
**Done when:** users can reproduce and share the experience without hidden state or fake success toasts.

### VLK-064 — Finish map-first visual polish
Status: todo
Depends on: VLK-039, VLK-063, VLK-062

**Files:** map/chrome styles, controls, visual fidelity ledger.
**Build:** refine hierarchy, spacing, icon consistency, source notices, selected-state visibility and deliberate motion. Keep globe toggle only if supported and tested. Remove all temporary UI, fake counts, unused controls, placeholder images and inconsistent component variants.
**Verify:** compare actual browser screenshots with the original visual contract at all target sizes; inspect text, panel geometry, legend, focus and map visibility.
**Done when:** the application itself—not only its README—looks portfolio-ready without reducing functional or provenance clarity.
