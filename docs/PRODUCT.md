# Product specification

Planning baseline: 2026-09-06, America/Los_Angeles. All features below are requirements, not claims of implementation.

## 1. Product thesis

Valkyrie makes the infrastructure behind digital life tangible: where electricity is generated, what regional grid assets are publicly mapped, where data centers are located, and how documented projects and connectivity fit into that picture. The portfolio should demonstrate frontend craft, geographic rendering, data engineering, testing and disciplined interpretation—not pretend to be an authoritative utility operating system.

Primary audience: a hiring manager or engineer spending two minutes exploring Jordan's work. Secondary audience: a technically curious visitor who wants to inspect an asset and understand where its information came from.

The first meaningful screen is the application itself. Do not build a marketing landing page before the atlas. The hook is a readable world map and a working guided story, not a wall of statistics or sign-up CTA.

## 2. Release definition

V1 is a curated, static, publicly reproducible atlas. A release has an explicit dataset version and coverage declaration. It need not match the reference's object count or worldwide detail. Three experiences must work:

1. **Discover:** start at World, enable a fuel/category filter, search a named asset, fly to it, and inspect dated source evidence.
2. **Investigate:** enter Northern Virginia or Dallas–Fort Worth, toggle a grid layer, inspect a facility and its documented relationships, and separately show approximate nearby geography.
3. **Share:** open a curated story, step through it, compare compatible assets, copy a URL, and reproduce that state in a fresh browser.

## 3. Scope matrix

| Capability | V1 commitment | Explicit boundary |
|---|---|---|
| World map | Interactive overview, optional globe projection if production-tested, reset/navigate controls | No photorealistic Earth, terrain or 3D buildings required |
| Power generation | A pinned real WRI global inventory, valid geocoded records, fuel/country filters, capacity and source details | Historical snapshot, not current worldwide operating status or grid output |
| Regional grid | Two bounded OSM-derived regional packs of transmission lines/substations | Not nationwide topology, available capacity, reliability analysis or engineering routing |
| Compute | Publicly mapped data-center facilities in those packs plus small independently sourced enrichments | A data center is not automatically an AI training campus; no inferred GPU counts |
| Projects | At least five independently sourced project records if evidence can be obtained; declared regional/editorial coverage | Announcements are not completed construction; target dates stay estimates |
| Connectivity | Regional documented/mapped exchanges, facilities or telecom features; explicit kind labels | Cable routes ship only with approved geometry rights; schematic routes never masquerade as actual cables |
| Search | Name/alias/source ID and curated organization/ticker aliases where supported | No stock quotes, investment analysis, or unfounded company→asset links |
| Inspector | Identity, geometry, facts, dates, evidence, relationships, data caveats | No invented complete profiles |
| Compare | Two to four compatible records; side-by-side facts and missingness | No ranking unlike assets by mixed measures |
| Stories | Three authored, evidence-backed, deterministic guided sequences | No live newsfeed or generated factual narration |
| Share | Versioned URL state and local saved views | No login or cloud synchronization |
| Data health | Per-source coverage/freshness/errors and methodology | Never equate a successful download with current underlying facts |
| Portfolio | README, architecture case study, genuine screenshots, demo script and release report | No invented metrics or claim of original reference source recovery |

A sources-first implementation may use fewer real examples when evidence is thin. It must then keep the affected required gate open and disclose the gap; it may not silently lower the target or fill it with synthetic data. Optional future layers are in `docs/FUTURE.md`.

## 4. Data cohort and geography

Use all valid geocoded plant records from a pinned WRI snapshot if the measured payload budgets permit. Do not randomly omit assets for appearance. If a full dataset exceeds budgets, partition it; if a documented sample is necessary, label it clearly and record a deterministic inclusion rule.

The two regional bounding boxes are design choices, not a claim of official administrative boundaries:

| Pack | ID | Bbox [west,south,east,north] |
|---|---|---|
| Northern Virginia | `us-nova` | `[-78.0,38.7,-76.8,39.4]` |
| Dallas–Fort Worth | `us-dfw` | `[-97.6,32.5,-96.3,33.4]` |

Initially query smaller cells inside these boxes rather than one heavy unrestricted OSM request. Treat boundary-crossing features deliberately; retain original geometry and source IDs. Validate which real features actually exist before selecting story subjects. Requirements are at least 10 real data-center facility records across both packs, at least one real grid line and one substation in each pack, at least five real project records overall, and at least five real connectivity records. More is welcome only within budgets and evidence quality. These are engineering acceptance targets, not assertions that data has already been gathered.

## 5. Information architecture

Use one application route at the static root. Application navigation is state, not a server route dependency. Primary modes: `Explore`, `Stories`, `Data & methodology`, `About`. Explore contains World/region selector, categories, filters, results and inspector. Compare is a panel reachable from selected records. A guided story temporarily controls map/filter/selection state and offers an explicit exit back to the prior exploration state.

Navigation labels: `World`, `Power`, `Grid`, `Compute`, `Projects`, `Connectivity`, `Search`, `Filters`, `Results`, `Compare`, `Stories`, `Sources`. Empty controls are hidden or disabled with an explanation; they must not promise an absent layer.

## 6. Required metrics and semantics

Show the number of unique catalog assets in the current filter/coverage scope. Rendered geometry segments and tile features do not equal facilities. Distinguish global catalog count from loaded regional count and visible-in-map count. If viewport count cannot be computed correctly, omit it rather than counting rendered fragments.

Capacity totals are limited to power assets with known capacity values; always include the missing-value count and dataset date. Never sum plant MW, data-center demand MW, transmission kV and battery MWh into one number. No national market-share or carbon-intensity calculation is required from a partial cohort.

The default data status text is `Published snapshot` with a version/date and a link to coverage. WRI's archive warning stays visible in relevant source/detail views. No simulated live ticker, fake pulse or invented monitoring status.

## 7. Non-goals and scope control

Do not implement SaaS tenancy, billing, authentication, secret management, an API marketplace, paid map providers, a production geospatial database, continuous telemetry, dispatch optimization, outage simulation, vulnerability ranking, site recommendations, satellite propagation, or an LLM copilot in v1.

Do not expand into country-level energy economics, water-risk simulation or stock-market tooling because similarly named GitHub projects do it. Their existence is not part of this specification.

## 8. Success criteria

A reviewer can complete all three primary journeys without instructions or an account. Every displayed asset and factual story claim can be traced to evidence. A clean clone builds from committed approved artifacts without external-data availability. Desktop, mobile, keyboard-only and WebGL-failure paths work. The README tells the truth about scope, dated data and measured performance. The end result is original enough to represent Jordan's engineering judgment rather than an unattributed visual copy.
