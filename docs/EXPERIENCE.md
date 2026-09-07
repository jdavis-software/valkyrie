# Experience and interaction specification

This is an original written design baseline. No approved screenshot or visual implementation exists yet. VLK-005 establishes reference observations and VLK-029 records Valkyrie's own visual specification. Do not claim image-level fidelity to a concept that was never created or approved.

## 1. Art direction

A quiet, dark cartographic workspace with a strong map, precise typography and minimal chrome. Think a readable atlas, not a fictional military command center. Valkyrie's identity should be geometric and restrained; do not borrow Power Atlas's logo or build an unrelated Norse illustration system.

Initial token proposal to validate for contrast in implementation:

| Token | Value |
|---|---|
| Canvas | `#080D18` |
| Panel | `#111A2B` |
| Raised surface | `#19253A` |
| Primary text | `#F3F6FC` |
| Secondary text | `#B8C5D9` |
| Border | `#2E3E56` |
| Primary action/focus | `#7DD3FC` |
| Power | `#F5C86B` |
| Grid | `#C4A7FF` |
| Compute | `#73DACA` |
| Projects | `#F2A184` |
| Connectivity | `#83B6FF` |

These are design choices, not measured WCAG compliance. Verify actual rendered combinations, including disabled states, hover, tooltips and text over map. Never use color as the only category/status cue. Use system sans-serif for v1; no remote font service is required. Control text defaults to 14px; body 15–16px; compact supporting labels no smaller than 12px. Titles have real hierarchy, not giant typography that crowds out the map.

Spacing scale: 4/8/12/16/24/32. Radius: 8 controls, 12 panels. Borders are subtle but visible. Motion: 120–180ms UI feedback, 400–700ms user-initiated camera transitions, all disabled or shortened under reduced motion. No auto-rotating globe on first load and no indefinitely pulsing fake live indicators.

## 2. Desktop layout

At 1440×900: a 64px header, 280px left exploration rail, flexible map canvas, and optional 360px right inspector. Inspector opening must resize/pad camera composition rather than cover the selected marker. Bottom attribution remains visible at all times. Map takes the remaining vertical height with no accidental page scrollbar.

Header: Valkyrie wordmark, World/region selection, a clearly named search trigger with shortcut hint, Stories, Sources and About. Secondary controls belong in the rail or map corner—not another full toolbar. Left rail contains layer toggles with icon/text/count, contextual filters, a result-count scope label and Results toggle. Map controls expose zoom, reset and projection only when supported/tested.

The initial state is World + power layer, no selection, no inspector, no autoplay, a modest `Explore a story` invitation and `Published snapshot` data label. Counts come from validated artifacts. Do not add random financial, energy-demand or accuracy KPIs.

## 3. Mobile and tablet

At 390×844 the header compresses to brand, region and search. Layer/filter/results controls open a single accessible bottom sheet with tabbed sections. One bottom sheet/dialog at a time; inspector replaces the sheet content, preserving a back action. Use `100dvh` and safe-area padding, keep the attribution/control area unobscured, and avoid horizontal scrolling except within an intentionally labeled compare table.

At 768×1024 use a collapsible left rail and overlay inspector with tested focus. At 1280×800 make inspector/rail widths smaller only within readable bounds; do not shrink type to force everything in. Prefer pagination to an inaccessible endless scrolling list.

Touch targets at least 44×44 CSS px for primary controls. Do not capture scrolling over open panels as map zoom. Two-finger/cooperative map gestures and visible zoom buttons provide alternatives. Never require hover to access a fact.

## 4. Search contract

`Cmd/Ctrl+K` opens a dialog; `/` focuses search only when no text input is active. Escape closes topmost modal and restores trigger focus. Arrow keys move results, Enter selects; screen readers hear result count without excessive live announcements. Empty query shows recent selections and curated entry points, not fabricated popular searches.

Rank exact source ID, exact normalized name, prefix, token match, then optional fuzzy match. Stable tie-breaker: canonical name then stable ID. Display asset kind, region/country, name and one disambiguating field. A source ID lookup bypasses fuzzy ambiguity. Normalize Unicode and whitespace; preserve original names for display. No external geocoder or arbitrary provider request.

## 5. Filters and results

Categories are multi-select. Country/region, fuel, status and known-capacity range appear only where applicable. Capacity range excludes unknown values only when user requests a range; show how many are unknown. `Clear filters` resets filter state, not the selected region or map camera unless explicitly labeled Reset view.

Results use the same predicate as map and summary. Show `X catalog assets in this scope`, not an unqualified map count. Results are keyboard navigable with labeled pagination, empty states and loading/error messages. The list works even without WebGL. Clicking a result opens details and moves the map if available; a failed map does not disable details.

## 6. Inspector

Tabs: Overview, Evidence, Related. Overview shows canonical name, source-reported type/status, country/region, meaningful quantities with units, coordinate precision, and last relevant source date. Missing facts read `Not reported`; zero is shown only when the provider really reports zero. Capacity and generation are not interchangeable.

Evidence shows the provider, original record ID, upstream URL, published/observed date when known, retrieval date, applied transformation, license and known limitations. A short source title links externally with safe URL validation and opener isolation. No raw HTML rendering of provider text.

Related has separate groups for documented ownership/operation/contracts/connections and `Nearby geography — not verified supply`. Each edge has evidence or an explicit derived-method explanation. Proximity overlays use a different line pattern and never animated electrical flow. No generalized confidence score or site-risk ranking.

## 7. Compare

Two to four selected records. Common identity fields always show; numeric columns appear only for compatible quantity kinds/units. A plant and a data center can be compared for geography/source dates, not ranked by different MW concepts. Missing data stays visible. Allow remove/clear and keyboard access. CSV export is optional future work; URL sharing is required.

## 8. Stories

Three required editorial story themes, with final subjects selected only after real records are verified:

- `Power around the world`: three contrasting fuel/geography examples from the historical inventory.
- `Inside a compute region`: facilities and mapped grid context in one regional pack, explicitly separating proximity from documented relationships.
- `Projects and connectivity`: dated project facts and real connectivity features, showing evidence and uncertainty rather than promising future completion.

Each story has 4–6 steps, title, short original copy, evidence IDs for factual claims, selected asset IDs, camera/filter state, and optional caveat. Manual Next/Previous first; optional Play is user-initiated, pausable and disabled for reduced motion unless explicitly chosen. Exit restores prior exploration state. Broken subjects must fail story validation before release.

## 9. Sharing and persistence

Use a versioned URL query codec, e.g. `?v=1&region=us-nova&asset=<encoded-id>&layers=power,grid&view=...`. Keep the query within 2,000 characters for baseline views. Whitelist enums, bound coordinates/zoom, cap lists and ignore/report malformed parameters. Do not serialize raw source URLs, user text beyond bounded query, credentials or huge state blobs.

Use `history.replaceState` for settled camera changes and `pushState` for intentional navigation checkpoints. Back/Forward restore selected state without a feedback loop. Saved views are versioned in localStorage; recover from corrupted/quota-denied storage. Opening a shared view in private mode must work without prior local state.

## 10. Required state coverage

Design and test: initial loading, empty search, no filter matches, unknown fact, unsupported region, missing optional source, failed shard, stale source snapshot, slow worker, WebGL unsupported/lost context, offline-after-load, corrupted saved view, invalid URL, missing story subject, and denied clipboard access. Every state has a specific action: retry, clear filter, open sources, use results, or copy text manually. No generic infinite spinner.
