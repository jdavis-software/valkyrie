# Architecture decision records

Status: baseline decisions selected for implementation. VLK-006 verifies exact dependency compatibility; substantive deviations require a new numbered ADR.

## ADR-001 — Static-first portfolio, not enterprise SaaS

**Decision:** one browser application and a separate ingestion toolchain. No application server, database service, account system, billing or runtime AI. **Reason:** the desired artifact is an approachable, reliable portfolio demonstration. **Tradeoff:** no personalized server state or live query service. **Revisit only if:** measured data scale or a new owner requirement cannot be met by static partitioned artifacts.

## ADR-002 — React + TypeScript + Vite

**Decision:** a single Vite app with explicit feature boundaries, CSS Modules/tokens and one pnpm lockfile. **Reason:** the product is an interactive canvas application rather than an SEO-heavy publishing site. **Tradeoff:** static metadata and About content are sufficient; no SSR architecture. **Constraint:** every production path, including worker chunks, must work under `/valkyrie/`.

## ADR-003 — MapLibre as the sole v1 renderer

**Decision:** direct MapLibre integration behind an adapter. **Reason:** keep rendering, picking, clustering and camera state in one system. **Tradeoff:** no custom photorealistic globe pipeline. **Revisit only if:** a specific measurable visualization cannot be implemented acceptably with native layers. Do not add deck.gl/Three.js merely because they appear in another project's stack.

## ADR-004 — Local, keyless geography and published data

**Decision:** local Natural Earth-derived overview geography, licensed regional data and versioned same-origin artifacts. **Reason:** a clean clone and public demo should not depend on a key or a public tile server's availability. **Tradeoff:** the baseline is not a street map; extra detail must come from legitimate regional data. **Constraint:** no hotlinking demonstration tiles as an unexamined production dependency.

## ADR-005 — Historical broad layer plus scoped deeper layers

**Decision:** a clearly dated WRI global plant snapshot plus two bounded regional packs and small curated project/connectivity collections. **Reason:** broad visual context and deep inspectability without pretending global completeness. **Tradeoff:** deliberately mixed temporal/geographic coverage, always surfaced. **Future:** additional sources can replace or complement a partition only with provenance, schema and deduplication migration.

## ADR-006 — Static GeoJSON first; tiled artifacts when justified

**Decision:** compact global points, regional geometry shards and separate details/search metadata. **Reason:** establish a working vertical slice before tile infrastructure. **Revisit trigger:** production benchmarks fail payload/render budgets after sensible simplification and partitioning. **Then:** evaluate PMTiles or another static tile scheme for the failing layer only; verify HTTP range/CORS/cache behavior. Do not require tile tooling for ordinary unit tests.

## ADR-007 — Evidence instead of fabricated confidence

**Decision:** facts and documented edges carry source evidence; derived proximity is a distinct type. **Reason:** precision in interpretation is part of the portfolio quality. **Tradeoff:** fewer dramatic claims, more unknown fields. **Constraint:** no unexplained percentage score, automatic physical supply inference, or false live status.

## ADR-008 — Repository task cards are authoritative

**Decision:** 96 explicit Markdown task cards plus GitHub epic issues. Task cards contain dependencies, behavior and proof; epic issue checklists summarize progress. **Reason:** the coding agent can recover context offline from Git. **Tradeoff:** GitHub synchronization is an explicit step, not an assumed integration. **Constraint:** update task statuses and execution evidence together; a green checkbox alone proves nothing.

## ADR template for changes

Number/title; date; status; concrete problem; evidence; chosen change; rejected alternatives; affected files/tasks/contracts; migration/testing; tradeoff; owner approval required only for changed scope, paid services, credentials or external side effects outside existing authorization.
