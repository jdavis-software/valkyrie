# Power Atlas reference-audit protocol

Target: https://power-atlas.sarvesh-kapre.chatgpt.site/

**Current status: incomplete.** The owner reports visible data-source listings, but this session has not retrieved that panel. A text reader, an open-tab URL, a blocked-browser screenshot or a desired-feature prompt cannot pass this audit.

## Session contract

Use the actually available Computer/in-app browser controls first. Record tool, actual tab URL/title, UTC time and viewport. The reference must render meaningful content before testing. Use desktop 1440×900 and mobile 390×844. Test 1280×800 and 768×1024 during responsive review when available. Normal public browsing only; no authentication bypass, policy changes, private endpoints or credential extraction. Inspecting public assets for technology evidence does not authorize copying them into Valkyrie.

Use `docs/reference/<session-id>/` for a sanitized evidence manifest and original analytical notes. Keep full HAR files, cookies and sensitive request material outside Git. Screenshots may be kept locally with stable IDs/hashes; commit only appropriately reviewed reference evidence, not proprietary site assets as product assets. For each observation record `id`, `step`, `viewport`, `before`, `action`, `after`, `screenshot`, `consoleNotes`, `certainty`, `limitations`.

## Interaction inventory — 32 required scenarios

These are test scenarios, not assertions that the reference implements each control. Mark a control `observed`, `not_present_after_review`, `failed`, or `not_tested`; explain the search for absent controls. Never report a feature absent solely because access was blocked.

| ID | Action | Required capture |
|---|---|---|
| REF-01 | First meaningful world view | Full viewport, title, loading-to-ready transition and visible attribution |
| REF-02 | Open main navigation | Every item, grouping, hidden/disabled state and close behavior |
| REF-03 | Open region selector | All visible options, searchable/paged behavior and coverage labels |
| REF-04 | Change to each offered priority region | Camera target, counts, auto-enabled layers and loading behavior |
| REF-05 | Switch map/globe if offered | Selection/filter preservation and camera transition |
| REF-06 | Pan and zoom world→country→city | Detail thresholds, labels, clustering and disappearing layers |
| REF-07 | Reset view/orientation | Restored camera, filters and current selection |
| REF-08 | Power category | Subtypes, legend, toggle behavior and count changes |
| REF-09 | Grid category | Line/substation separation, voltage labels and geometry selection |
| REF-10 | Compute category | Facility/campus/AI distinctions and category caveats |
| REF-11 | Projects category | Status/date/queue filters and unmapped records |
| REF-12 | Connectivity category | Cables/landings/exchanges/licenses and route semantics |
| REF-13 | Satellite entry point if offered | Mode, clock, catalog/constellation selection and attribution |
| REF-14 | Filter drawer | Every field, valid range, reset, multi-select and empty combinations |
| REF-15 | Search exact visible asset name | Ranking, result metadata, selected asset and camera |
| REF-16 | Search organization/alias/ticker | Entity grouping and relationship evidence |
| REF-17 | Search cable/satellite/ID | Cross-domain results and relevant mode change |
| REF-18 | Search keyboard and no-results paths | Shortcut, arrows, Enter, Escape and recovery |
| REF-19 | Power asset detail | All tabs/fields, units, source dates and source links |
| REF-20 | Grid asset detail | IDs, voltage, status, multipart geometry and provenance |
| REF-21 | Compute asset detail | Operator versus owner, stated demand/AI evidence and unknown fields |
| REF-22 | Project/queue detail | Planned versus actual dates, queue role and location precision |
| REF-23 | Connectivity detail | Cable system versus segment/landing, RFS and evidence |
| REF-24 | Satellite detail | Catalog ID, element epoch, computed values and position timestamp |
| REF-25 | Sources/data/methodology panel | All rows, nested tabs, pagination/scrolling, linked datasets and caveats |
| REF-26 | Follow source links | Final public URL, dataset release, access restrictions and terms |
| REF-27 | Compare/related/nearby if offered | Relationship kinds, distances, units and selection limits |
| REF-28 | Share and browser history | URL changes, fresh-tab restoration, Back/Forward and copied state |
| REF-29 | Story/tour/time controls if offered | Start/step/exit, clock behavior and restoration |
| REF-30 | Mobile full exploration journey | Touch, drawers, scroll traps, attribution and keyboard overlays |
| REF-31 | Keyboard/reduced-motion review | Focus order, visible focus, motion alternatives and dismissal |
| REF-32 | Reload/error/loading review | What is persisted, visible retry/error states and console observations |

Inventory controls recursively: expand accordions, check tabs, scroll virtualized/paged lists, and record the number of reviewed rows/pages. A screenshot of the first source page is not evidence that the whole source inventory was captured. Test at least one representative asset in each domain that is actually present; add two contrasting asset cases per domain where data allows (e.g. planned versus operating, known versus unknown capacity).

## Source-panel extraction — required fields

For every listed provider/dataset, capture: exact display label; publisher; displayed URL; final redirected URL; dataset title; release/version; coverage; declared update frequency; displayed last-updated date; acquisition format if disclosed; license/attribution text or link; linked domain/layer; record count and what it counts; precision/missingness disclaimer; asset-level example; screenshot/DOM evidence ID; browser observation time; and verification status.

Store source claims separately from verified behavior. `listed-in-ui`, `asset-citation`, `payload-lineage`, and `upstream-record-match` are independent evidence stages. A source can be listed but unused in the tested path. A request to a local snapshot does not mean the upstream publisher is absent. A displayed updated date might describe ingestion rather than the age of the underlying record.

## Runtime and technology evidence

Only after the UI renders, observe the HTML entry, loaded JS/CSS, public asset URLs, workers, fonts, tile/style files, data responses, service workers and storage behavior. Record observed bytes/timing as environment-specific measurements. For each candidate library retain the exact relevant fingerprint and artifact ID, then corroborate actual use; a leftover license banner alone may identify bundled but unused code.

Collect public requests across first load, a region change, one layer toggle, search, selection, source-panel opening and orbit mode. Sanitize secrets, cookies, signed query values and personal fields before retaining a manifest. Preserve payload schema examples only when lawful and necessary, not entire proprietary databases. Do not guess file paths or fuzz private services.

Questions: static files or API? all data upfront or shards/tiles? search local or remote? source drawer embedded or fetched? globe and map one renderer or multiple? orbital updates calculated locally or received? What changes on refresh? What fails under slow network? Document unknowns rather than extrapolating private architecture.

## Feature-to-task matrix and completion

Create rows with observed feature ID, evidence ID, exact behavior, Valkyrie treatment (`match-interaction`, `original-improvement`, `defer-with-reason`, `not-applicable`), VLK/EXP task IDs and acceptance tests. Separate the user's desired features from observed reference behavior. New missing requirements become explicit tasks/scope amendments, not untracked notes.

VLK-003 and EXP-006 can pass only with the scenario inventory, exhaustive visible source-panel inventory, representative asset traces, runtime evidence attempted with limits recorded, and completed feature-to-task matrix. Exact recovery of private framework/backend details is not required; honest `unknown` entries are allowed. A browser-blocked attempt does not meet the rendered-evidence requirements. Record an owner-approved waiver only as a waiver, never a successful audit.
