# E05 — Search, filtering and inspection

Goal: the map is a usable explorer with one coherent source of truth for records, counts and details.

### VLK-041 — Build catalog query and filter predicates
Status: todo
Depends on: VLK-014, VLK-032

**Files:** domain query/ranking helpers and catalog index.
**Build:** index stable IDs, names, aliases, source IDs and reviewed organization aliases. Implement exact→prefix→token ranking with deterministic tie breaks. Apply category/region/fuel/status/known-capacity predicates consistently; preserve missingness.
**Verify:** queries match expected IDs on real sample fixtures, Unicode/whitespace normalize correctly and unsupported numeric comparisons are rejected.
**Done when:** query semantics are deterministic and reusable by search, map, results and metrics.

### VLK-042 — Move query work behind a worker protocol
Status: todo
Depends on: VLK-041

**Files:** `src/workers/search.worker.ts`, typed message/client wrapper.
**Build:** load the compact index once, process bounded requests with generation IDs, discard stale responses and terminate workers on cleanup. Avoid transferring the full catalog on every keystroke. Provide a capped main-thread fallback if worker initialization fails.
**Verify:** out-of-order responses, worker crash, cancel/retry and repeated mount tests. No stale query overwrites the newest results.
**Done when:** the UI stays responsive and query errors remain recoverable.

### VLK-043 — Implement command-palette search
Status: todo
Depends on: VLK-041, VLK-042

**Files:** search dialog/results components and accessibility tests.
**Build:** implement Cmd/Ctrl+K, scoped slash shortcut, bounded input, result-count feedback, loading/empty/error states and keyboard selection. Show type/region disambiguators and outside-filter status; reveal a hidden result only through an explicit action.
**Verify:** mouse, keyboard and screen-reader labels; Escape restores focus; slow older queries do not flicker over new results.
**Done when:** users can reliably find real assets without touching the map or calling an external geocoder.

### VLK-044 — Wire filters, results and map to one result set
Status: todo
Depends on: VLK-043, VLK-037

**Files:** filters UI, paginated results, map filter adapter and shared selectors.
**Build:** connect category/region/fuel/status/capacity controls to the same canonical predicate and counts. Add clear/reset semantics, result selection and loading/empty states. Distinguish global, loaded and filter scope rather than counting rendered fragments.
**Verify:** map, list and summary agree for representative filter combinations; zero matches and unknown capacity behave as specified; keyboard pagination works.
**Done when:** controls change real data consistently, with no cosmetic-only filters.

### VLK-045 — Implement lazy source-aware inspector
Status: todo
Depends on: VLK-018, VLK-032, VLK-044

**Files:** inspector overview, detail-shard repository and cache.
**Build:** fetch details on selection, retain request-generation safety, show identity/status/location precision and typed facts, and render null as Not reported. Preserve selection across panel and camera changes. Cache bounded details and reuse pending requests.
**Verify:** rapid selection A→B with A resolving last, missing shard, malformed detail, no geometry and duplicate source aliases. Map failure does not disable inspection.
**Done when:** selecting any valid catalog asset yields the correct record or an actionable error, never stale unrelated details.

### VLK-046 — Build evidence and source-health views
Status: todo
Depends on: VLK-045, VLK-019

**Files:** evidence tab, Sources/Methodology feature and attribution UI.
**Build:** show field-supporting sources, dates, retrieval time, version, license, transformations and limitations. Surface historical/partial coverage warnings and distinguish source age from load health. Validate external links and keep source attribution reachable on mobile.
**Verify:** sample displayed claims trace to actual evidence; historical WRI warnings remain visible; source URLs cannot inject HTML or unsafe navigation.
**Done when:** a reviewer can audit a displayed fact without reading source code.

### VLK-047 — Build organization and relationship presentation
Status: todo
Depends on: VLK-019, VLK-045

**Files:** organization catalog view, related-tab components.
**Build:** render only evidence-backed ownership/operation/project/connection/contract edges. Preserve raw unverified owner text separately. Label relationship kind, applicable dates and limitations. Show an honest empty state when there are no documented relationships.
**Verify:** missing evidence fails data validation; same-name organizations do not merge automatically; contract edges are not rendered as physical transmission routes.
**Done when:** relationship exploration is useful without inventing a global infrastructure graph.

### VLK-048 — Prove the complete exploration journey
Status: todo
Depends on: VLK-044, VLK-045, VLK-046, VLK-047

**Files:** Playwright explorer specs, execution evidence.
**Build:** remove temporary development selection views and wire search→selection→camera→inspector→evidence→filter reset. Include a no-map results journey. Fix state synchronization and focus issues found in the loop.
**Verify:** run on production preview at desktop/mobile, inspect screenshots and console output, and record exact test subjects from the current data release.
**Done when:** an unfamiliar visitor can discover and inspect real data end to end without developer instructions.
