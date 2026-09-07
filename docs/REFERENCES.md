# References and evidence ledger

Planning date: 2026-09-06 (America/Los_Angeles). A reference is not permission to copy and does not establish the target application's internal stack.

## 1. User-supplied inspiration

| Reference | Status in planning pass | Appropriate use |
|---|---|---|
| https://power-atlas.sarvesh-kapre.chatgpt.site/ | Public text retrieved | Interaction/product inspiration, not source recovery |
| https://x.com/_cyberhusky/status/2076018638658896085 | Fetch returned 403 | Preserve original context; do not invent post contents |
| https://github.com/jdavis-software/valkyrie | Connected GitHub tool verified public, empty and writable before initialization | Owner's new implementation repository |

The retrieved Power Atlas text contains a World selector; search spanning companies/tickers/facilities/grids/cables/satellites; categories for power generation, grid/transmission, data centers/AI, projects/pipeline and connectivity; a displayed 212,681 mapped-object count; and zoom/navigation guidance. These are visible text observations. The count was not audited and is not Valkyrie's record-count target.

Not established: React/Next/Vite usage, map renderer, CSS framework, source datasets, database, backend, cloud topology, runtime AI, or the original repository. Previous similarly named repository findings do not prove provenance. No production bundles, HAR or reference screenshots are included in this repository.

## 2. Reference inspection checklist for VLK-003

Use normal public browsing only. Record browser/date/viewport and whether scripts actually executed. Inspect first load, one category toggle, search, a detail panel, a region change, zoom behavior, visible source credits and mobile layout. Separate observation from inference. If browser tools are unavailable, preserve the written limitation and continue.

Write a short observation ledger with columns: observation, evidence location, certainty, transferable interaction principle, and original Valkyrie treatment. Do not chase exact code reproduction, probe private endpoints, bypass controls, harvest credentials, or import the site's data. Keep any local captures free of cookies/tokens and uncommitted unless rights and sanitization have been reviewed.

## 3. Technical/source reference shelf

| ID | Primary reference | Status and purpose |
|---|---|---|
| REF-MAP | https://maplibre.org/maplibre-gl-js/docs/ | Read in planning; official rendering and Vite worker integration docs; recheck against pinned version |
| REF-VITE | https://vite.dev/guide/static-deploy.html | Read in planning; base-path/static deployment guidance |
| REF-WRI | https://github.com/wri/global-power-plant-database | Read in planning; historical v1.3.0 and license/maintenance warning |
| REF-NE | https://www.naturalearthdata.com/about/terms-of-use/ | Read in planning; public-domain geography terms |
| REF-OSM | https://www.openstreetmap.org/copyright | Read in planning; ODbL and attribution requirements |
| REF-NODE | https://nodejs.org/en/about/previous-releases | Official version-support reference; implementation must select and pin compatible LTS |
| REF-INFRA | https://github.com/openinframap/openinframap | Implementation reference for a separate open-source infrastructure map; not identified as a target dependency |
| REF-OVERPASS | https://wiki.openstreetmap.org/wiki/Overpass_API | Acquisition reference to verify during source setup |
| REF-PAGES | https://docs.github.com/en/pages/getting-started-with-github-pages | Deployment/account setup reference to verify before publishing |
| REF-PLAYWRIGHT | https://playwright.dev/docs/intro | Browser testing reference to verify against installed version |
| REF-PEERING | https://www.peeringdb.com/apidocs/ | Optional provider candidate; API access and reuse terms not approved in this plan |
| REF-CABLE | https://www.submarinecablemap.com/ | Optional visual/data-provider reference; route redistribution not approved |
| REF-GEM | https://globalenergymonitor.org/projects/global-integrated-power-tracker/ | Future more-current generation source candidate; acquisition/terms/schema gate required |
| REF-EIA | https://www.eia.gov/opendata/ | Future U.S. inventory/operations source candidate; keep datasets and units distinct |
| REF-LBNL | https://emp.lbl.gov/queues | Future generation/storage interconnection project candidate; not a data-center demand queue |
| REF-PMTILES | https://docs.protomaps.com/pmtiles/ | Future scale path; validate hosting range requests before use |

Some additional browsing attempts failed with service errors during planning. Consequently, optional URLs are a research queue, not a claim that their current content, API behavior, or licenses have been verified.

## 4. Originality and attribution

Valkyrie has original branding, composition, copy, code and curated stories. Cite Power Atlas as inspiration in README/About without implying affiliation. Upstream libraries and datasets keep their notices. The reference's screenshots are not Valkyrie portfolio screenshots. Do not claim that the reference was open sourced or reverse engineered when only its visible behavior was inspected.
