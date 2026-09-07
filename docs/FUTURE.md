# Future scope — excluded from the default ASTRA goal

These are explicit later choices, not hidden v1 requirements. Do not start them until the 96 required tasks are complete or the owner changes scope. Each future module needs a concrete source/license/quality/UX contract first.

| ID | Extension | Entry gate and constraints |
|---|---|---|
| FUT-01 | More current generation sources such as GEM/EIA | Verify acquisition, terms, schema and status dates; deduplicate against the historical inventory rather than stacking duplicate plants |
| FUT-02 | Full-country/regional expansion | Measure current pack limits and automate a lawful extraction path; preserve declared coverage |
| FUT-03 | Static vector tiles / PMTiles | Demonstrated failing layer budget, tested hosting range requests and approved data licensing |
| FUT-04 | Global submarine cable routes | Explicit route redistribution rights, geometry precision, source dates and attribution |
| FUT-05 | PeeringDB-backed connectivity | Current terms/API/access review, no personal contact fields, no inference of compute/electrical capacity |
| FUT-06 | Satellite orbit module | Source terms, time model, propagation correctness and clear element-age limits; no fake live positional feed |
| FUT-07 | Electricity operating metrics | Verified current API, cache/backend decision, units/timezone coverage and honest freshness; distinct from plant inventories |
| FUT-08 | Broader interconnection project datasets | Distinguish generation/storage queues from data-center load requests and operating assets |
| FUT-09 | Historical snapshots and change comparison | Real versioned evidence, not interpolated or invented past states |
| FUT-10 | 3D/globe or specialized deck.gl overlays | A specific visual need beyond the tested native map; measurable GPU/browser tradeoff |
| FUT-11 | User-generated annotations | Persistence/auth/moderation/privacy decision; do not turn a static portfolio into SaaS by accident |
| FUT-12 | Natural-language search assistant | Explicit owner request, provider setup, cost limits and grounded read-only facts; no runtime AI needed for current v1 |
| FUT-13 | Data/API exports | Dataset-specific redistribution and derived-database review; include provenance, precision and license |
| FUT-14 | Point-to-line/route-aware distance | New geometry algorithm, antimeridian/units tests and accurate precision labels; never infer utility supply |
| FUT-15 | Rich open-graph/share image generation | Actual app state/attribution preserved and original asset rights; no fabricated screenshots |
| FUT-16 | Additional languages | Source-name preservation, locale-safe units/date formatting and keyboard/accessibility review |

Still excluded without a separate product decision: site suitability rankings, grid vulnerability analysis, financial recommendations, private facility data, production telemetry, billing, enterprise IAM and orchestration infrastructure.
