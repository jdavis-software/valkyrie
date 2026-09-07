# A6 — Integrated experience and original visual craft

Reuse the baseline visual system and native HTML controls. Use the reference as observed interaction evidence, not a source of copied branding, raster UI or unsupported facts. The full product is an atlas with meaningful actions, not a marketing shell.

### EXP-037 — Unify cross-domain discovery and filtering
Status: todo
Depends on: EXP-017, EXP-024, EXP-030, EXP-033

**Files:** `src/features/search/`, `src/features/filters/`, `src/state/atlasState.ts`, query predicates.
**Inputs:** ground, connectivity and orbital catalogs with one canonical query protocol.
**Build:** search facilities, organizations, verified ticker aliases, source IDs, cable systems, IXs, projects and satellites. Result rows show kind, region, source/epoch and missing-location state. Exact selection opens the appropriate mode without discarding recoverable prior context. Share one filter predicate across counts, results and map; allow subtype-specific filters without mixing incompatible fields. Explain when a result exists outside the currently loaded geometry or configured coverage.
**Verify:** exact-ID and alias ranking, Unicode names, no results, keyboard palette flow, filters spanning multiple domains, stale revisions and mode changes. A ticker match must not invent company ownership of unrelated infrastructure.
**Evidence:** fifteen named reproducible search/filter cases across the six domains and actual count reconciliation.
**Done when:** visitors can discover any published domain through one coherent search experience, not six unrelated widgets.

### EXP-038 — Build rich, comparable and source-aware inspectors
Status: todo
Depends on: EXP-037, VLK-045

**Files:** `src/features/inspector/`, `src/features/compare/`, `src/features/sources/ClaimEvidence.tsx`.
**Inputs:** typed claims, hierarchy, dates, relationships and domain-specific metric definitions.
**Build:** use a shared inspector shell with domain-specific sections: identity/hierarchy, known facts, dates/status, relationships, geometry precision, source evidence and limitations. Show conflicting claims and selection rationale without inventing confidence percentages. Comparison supports two–four compatible entities and metric meanings; incompatible comparisons receive an explicit explanation. Source links open the exact claim/record context where available.
**Verify:** unknown versus zero, plant/unit double counting, IT load versus facility demand, cable design versus lit capacity, requested versus operating MW and satellite epoch versus observation time. Verify focus restoration, long names, missing imagery and lazy-detail failure without replacing evidence with placeholders.
**Evidence:** one complete inspector per domain, a conflict example, a rejected incompatible comparison and mobile captures.
**Done when:** detailed exploration is useful and technically honest, with no generic complete-looking profiles assembled from unsupported facts.

### EXP-039 — Add a source-backed events and project timeline
Status: todo
Depends on: EXP-016, EXP-022, VLK-052

**Files:** `src/features/timeline/`, `src/domain/events.ts`, `config/curation/events.json`.
**Inputs:** dated primary project, queue, cable and regulatory claims.
**Build:** provide a filterable event timeline for announcements, construction targets, approvals, withdrawals and observed service starts. Preserve day/month/year precision and distinguish targets from completed events. Select an event into the related asset/source view; keep aggregate events nonspatial. Timeline navigation does not imply a historical reconstruction of the entire map. Implement historical map snapshots only when real versioned inventory supports them, not by interpolating today's assets backward.
**Verify:** sort partial dates deterministically without displaying invented days, handle conflicting dates, future targets and undated items, and retain source citations. A cable license approval cannot become an RFS event or show a route as operating.
**Evidence:** at least ten cited events with precision/state tests and a keyboard/mobile timeline journey.
**Done when:** time adds explanatory context while preserving the difference between historical evidence, proposals and unknowns.

### EXP-040 — Persist and share mode, selection and time safely
Status: todo
Depends on: EXP-031, EXP-028, VLK-058

**Files:** `src/state/urlState.ts`, `savedViews.ts`, `src/features/share/`, history tests.
**Inputs:** baseline versioned URL state, projection-specific cameras, orbital clock and filter state.
**Build:** version the expanded share schema for Map/Globe/Orbit mode, camera, filters, selected canonical IDs, release hint and explicit time behavior. Clamp invalid coordinates/times and sanitize unsupported query values. Do not serialize credentials or huge result sets. Back/Forward should restore meaningful committed navigation states rather than every animation frame. Distinguish a frozen-time orbital link from a Now link. Handle missing/changed assets and older release availability honestly.
**Verify:** fresh context round trip, malformed/oversized URLs, deleted asset IDs, old schema migration, denied clipboard/storage and stale-element policy. Copy fallback shows a selectable valid URL. Projection changes must not generate history floods.
**Evidence:** canonical URL fixtures and fresh-browser ground/orbit/share/back/forward captures.
**Done when:** another visitor can reproduce supported state without an account or hidden local storage assumptions.

### EXP-041 — Author six guided, evidence-backed showcase stories
Status: todo
Depends on: EXP-038, EXP-039, EXP-040, VLK-061

**Files:** `config/stories/`, `src/features/stories/`, `tests/data/stories.test.ts`, `docs/portfolio/demo-script.md`.
**Inputs:** actual published assets, relationships, events and valid source references; reuse and refine the baseline three stories.
**Build:** deliver six total stories with four–six meaningful steps each, covering generation, regional grid/compute context, an international comparison, connectivity, proposed infrastructure and orbital exploration. Choose real subjects after ingestion rather than fabricating predetermined examples. Store canonical IDs, view state, evidence-backed text and transition behavior. Nearby geography must be explicitly different from verified supply. Every story can be exited back to prior exploration state.
**Verify:** all IDs resolve against the release, each factual sentence has evidence, no step assumes unavailable geometry, and pause/next/back/exit works with keyboard and reduced motion. A story involving blocked data remains unfinished rather than substituted with a mock.
**Evidence:** six playable sequences, linked claim references, genuine captures and a rehearsed demonstration script.
**Done when:** the portfolio has memorable working journeys that explain real infrastructure instead of merely animating a globe.

### EXP-042 — Finish all layouts, accessibility and interaction polish
Status: todo
Depends on: EXP-041, EXP-036, VLK-065

**Files:** shared design tokens and feature components; `tests/e2e/expanded-accessibility.spec.ts`; `docs/qa/expanded-visual-review.md`.
**Inputs:** active original design contract and actual production app in all three modes.
**Build:** refine 1440×900, 1280×800, 768×1024 and 390×844 layouts. Keep typography legible, inspectors scrollable, source attribution visible, mobile safe areas respected and controls reachable without a mouse. Verify keyboard focus/escape, touch targets, contrast, reduced motion, no-WebGL results and screen-reader announcements. Remove dead controls, ornamental fake metrics and duplicated panels. Treat rendering density and UI chrome density separately.
**Verify:** compare actual screenshots with the approved design contract; inspect copy, spacing, typography, colors, state hierarchy and responsive behavior. Automate accessibility checks but also perform manual keyboard/focus tests. A successful build alone does not pass visual or accessibility review.
**Evidence:** reviewed screenshots for each viewport/mode, concrete mismatch fixes and functional/accessibility results.
**Done when:** the entire product feels intentionally designed and remains usable outside the ideal desktop/GPU path.
