# Data acquisition, source registry and publication policy

This document separates **selected source candidates**, **approved publication inputs**, and **data actually shipped**. At the planning baseline no data has been imported or approved at file level. Registry entries must progress through `candidate → terms_reviewed → acquired → validated → published`, or `blocked`. A working URL alone is not approval.

## 1. Default source plan

### NE — Natural Earth overview geography

Primary terms: https://www.naturalearthdata.com/about/terms-of-use/ . The publisher places its map data in the public domain. Use a pinned low-resolution land/country dataset for the local background, retaining source/version metadata and a courtesy credit. This overview is intentionally not a navigable street map.

Acquire the smallest suitable original release from the publisher or its identified maintainer repository. Convert/simplify offline, preserve multipart geometries and antimeridian behavior, and document the chosen boundary dataset. Do not download map screenshots or republish third-party hosted tiles. Country labels/codes must come from an explicit mapping; `-99` and disputed/no-code records are not valid ISO country codes.

### WRI — historical global power plants

Primary repository: https://github.com/wri/global-power-plant-database . The publisher README identifies v1.3.0 as its final release, says the project is not maintained, and identifies the data license as CC BY 4.0. Do not rebuild its legacy Python pipeline or present this as current 2026 inventory.

Acquire the published v1.3.0 CSV, verify schema and terms, and pin the exact download URL and SHA-256. If using a repository CSV rather than the named release, pin a commit and label its version accurately; never call an arbitrary branch tip v1.3.0. Preserve `gppd_idnr`, original name, country code/name, coordinates, `capacity_mw`, fuel fields, commissioning information when supplied, owner text, URL and source-year fields. Preserve source generation measurements by year only if needed, clearly distinguishing measured/estimated values. Do not infer operating status from dataset inclusion. A fractional commissioning-year value is not an exact commissioning date.

Keep an archive warning in manifest, source panel and affected inspector. Download date and build date must not replace source-year metadata. The release proves an asset appeared in that source snapshot, not that the asset exists unchanged today.

Fallback: another accessible copy of the exact released content whose provenance and checksum can be established. If no legitimate source can be acquired, mark the real-data gate blocked; use clearly named test fixtures only for development, never as a fake public dataset.

### OSM-GRID — bounded regional grid features

Source/license: https://www.openstreetmap.org/copyright . OSM is licensed under ODbL; attribution and applicable database-sharing obligations must be respected. Raw OSM-derived partitions and notices retain this license rather than being relabeled as original MIT application data.

Ingest separately for `us-nova` and `us-dfw`. Baseline tags: `power=line`, `power=minor_line`, `power=cable` and `power=substation`. Source type and element ID form the namespace: node/way/relation IDs are not interchangeable. Preserve `voltage`, `circuits`, `cables`, `frequency`, `operator`, `name`, and source timestamp where available. Retain the raw string for multi-valued voltage. Any parsed voltage is a derived field with a testable parser, not the original fact.

Use bounded Overpass requests from ingestion tooling, not the browser. Plan modest cells, serial requests, a descriptive user agent, exponential backoff for rate limits, and cached raw responses. Check the selected endpoint's current usage policy before network acquisition. Do not distribute load across alternate endpoints to evade rate limits. If responses are too large, shrink the permitted query or use a legitimate downloadable extract.

Example query shape, not a pre-executed query:

```text
[out:json][timeout:60];
(
  way["power"="line"](south,west,north,east);
  way["power"="minor_line"](south,west,north,east);
  way["power"="cable"](south,west,north,east);
  nwr["power"="substation"](south,west,north,east);
);
out tags geom;
```

Use a mature geometry converter when relations need assembly. Test member roles, holes, missing members, boundary crossings and duplicate ways. Out-of-box geometry may be retained with a declared pack association, but must not imply data coverage beyond the pack. Display grid features as mapped geometry, not an inferred electrically connected graph.

### OSM-COMPUTE — regional public facility locations

Use the same approved OSM acquisition and licensing process. Verify the current documented tagging convention, with `telecom=data_center` as a starting candidate rather than inventing a broad tag filter. Review records for site/building duplication and geometry precision. An area geometry may yield a display representative point; keep the original geometry and label the point as derived, not a precise entrance.

A facility is `data_center` unless source evidence explicitly supports a more specific classification. OSM mapping alone does not establish AI workloads, installed GPU counts, available electrical capacity, owner subsidiaries or a current operating state. Preserve unknowns. Names/operators can support a search alias only with a recorded match basis.

### CURATED-PROJECTS — small first-party evidence collection

Create at least five real project records from official operator/developer/utility announcements or publicly published agency material. Record original URLs, title, publisher, date, retrieval time, claimed status and exact quantity semantics. Write short original summaries; do not reproduce full articles, photographs, paywalled content or third-party maps.

The acquisition process is bounded manual curation, not a promise to scrape the web continuously. Avoid inference when an announcement names only a city: either show a `city`-precision point labeled accordingly or keep the record in results without a mapped facility point. A project with unknown exact geometry must not appear as a verified parcel.

Do not overwrite older public statements as though they had always been current. Preserve a small ordered evidence history. A proposed completion date is a source-reported target, not an operating date. Five verified records is the target; if evidence or reuse conditions are inadequate, record the shortfall and keep the required gate open.

### CONNECTIVITY — real regional features, not invented submarine routes

Baseline: at least five publicly documented/mapped connectivity facilities or features across the regional packs. Review supported OSM telecom/exchange tags and supplement with concise first-party factual curation when appropriate. Distinguish a facility from an exchange organization and an exchange membership from a physical fiber route. Require at least one connectivity-specific evidence fact beyond 'this is also a data center'.

TeleGeography is a useful reference for a future cable module, not an approved redistributable route source in this plan. PeeringDB is another candidate; read its current API/terms and data-use conditions before adopting a snapshot. Neither is mandatory for v1. No signup, credential or unclear license should prevent the basic portfolio app from running.

A cable layer is enabled only if actual geometry can be published under verified terms. A great-circle arc between endpoints, if ever added, must be explicitly schematic and excluded from physical cable metrics. Do not draw fictional routes to satisfy the reference's visual appearance.

## 2. Registry contract

Each `config/sources.json` record must contain:

- `id`, name, homepage, publisher and source kind.
- `acquisitionUrl`, acquisition method, terms/license URLs and `licenseDecision` (`pending`, `approved`, `blocked`).
- A short decision rationale, attribution text, redistribution conditions and evidence of the terms checked.
- Declared geographic/time coverage, source granularity, known exclusions and reliability limitations.
- Pinned version/commit when available, source-published date, retrieval date, SHA-256 and raw-cache location.
- Required transformation, generated artifact paths, refresh policy and fallback.
- `containsPersonalData` and redaction/omission policy; baseline is infrastructure metadata, not personal contact details.

Never check in tokens, signed URLs, cookies, raw HARs or personal phone/email fields. Contacts in third-party datasets are not needed for this project.

## 3. Pipeline stages

`fetch → cache → parse → normalize → validate → deduplicate → partition → serialize → verify → publish`

Fetching writes raw inputs into gitignored `.cache/valkyrie/raw/`, with HTTP status, ETag/Last-Modified when available and SHA-256. Limit response size and timeout. Parse against a source-specific schema; reject/quarantine malformed records with reasons. Preserve source IDs and original values before normalization.

Offline transforms consume locked inputs. Canonical output ordering is source namespace, stable asset ID, then geometry-part ID. Sort unordered arrays and use deterministic rounding rules. Do not inject `Date.now()` into normalized artifacts; acquisition/build metadata belongs in a separate locked release record. The manifest does not hash itself: hash the manifest in the pointer/lockfile and hash payloads in the manifest.

Only after all validation passes may a release pointer change. A failed ingest cannot erase the previous valid release. Data refresh produces a reviewable diff and should not auto-merge changes merely because HTTP succeeded.

## 4. Licensing separation

Original implementation code and third-party data are different works. Preserve source notices in `public/credits/` and source metadata in every release. The portfolio can display one combined view without pretending all underlying datasets share a license.

Keeping partitions separate is an engineering aid, not an automatic legal conclusion about combined/derived databases. Before publishing combined search indexes, cross-source tables or downloadable exports, record the applicable obligations in the registry. If obligations are unclear, keep the source excluded from publication and continue with approved inputs. Do not offer legal assurances that an arbitrary combination is compliant.

Default original-code license recommendation is MIT; add the license during the foundation decision task, with explicit exclusion of separately licensed data/assets. Do not relicense the reference site's content.

## 5. Release integrity and coverage

Required checks: positive real record counts; no fixture namespaces; unique canonical IDs; valid source references; geometry bounds/type; finite numbers; missingness; status/date consistency; checksum agreement; dataset-specific license notices; no unexpected personal fields; deduplication report; per-pack coverage; and all story subject IDs resolving.

Count categories independently and deduplicate geometry parts. A global overview loaded alongside a regional feature does not prove a physical or organizational relationship. If a source is historical, stale, missing or limited, the UI and release report must say so.

Primary source evidence checked during planning: Natural Earth terms, OSM copyright and WRI repository README. Other acquisition endpoints and optional providers must be verified during implementation; they are not asserted to have been successfully downloaded in this planning pass.
