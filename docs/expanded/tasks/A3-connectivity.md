# A3 — Cables, landing places, exchanges and licenses

A line between two coastal points is not evidence of an installed cable route. Current TeleGeography image reuse guidance does not automatically license the underlying database. Use [research findings](../RESEARCH.md) and source intake.

### EXP-019 — Model connectivity without collapsing object types
Status: todo
Depends on: EXP-009

**Files:** `src/domain/connectivity.ts`, `schemas/connectivity.ts`, `tests/unit/connectivity.test.ts`.
**Inputs:** cable system/segment/landing, IX/network/facility and filing requirements.
**Build:** implement distinct types and stable identifiers; explicit cable-segment/system membership, landing associations, IX facility presence and regulatory subjects. Model source-stated RFS date, route precision and design versus lit capacity separately. Allow a cable without permitted route geometry and a license without coordinates. Never create coordinates for organizational/legal records merely to make them map-visible.
**Verify:** a cable with multiple segments/landings stays one system; a filing is not counted as a new physical cable; IX membership does not imply a dedicated path; unknown route and capacity remain null.
**Evidence:** schema tests and a representative normalized relationship graph with source evidence.
**Done when:** every connectivity object has correct identity, hierarchy, geometry semantics and count behavior.

### EXP-020 — Acquire licensed cable and landing data
Status: todo
Depends on: EXP-019, EXP-010

**Files:** `scripts/ingest/adapters/cables.ts`, `config/sources.json`, `tests/data/cables.test.ts`.
**Inputs:** an exact approved cable dataset or independently published operator/landing facts with documented reuse rights.
**Build:** target ten source-backed systems and twenty landing records; use more when a lawful full dataset is available. Review the selected file's license rather than inheriting a mirror's README claim. Record route geometry as provider-published, approximate or schematic. No paid dataset acquisition is authorized. If route rights remain unresolved, implement landing-point/schematic fallback and keep the actual-route coverage gate blocked.
**Verify:** antimeridian splitting, multipart paths, route/system IDs, endpoint associations, RFS precision and duplicate landings. Never derive true route length from schematic geometry or silently copy a rendered map's lines.
**Evidence:** rights decision, exact input/hash, cohort and missing-geometry report, tests and map captures.
**Done when:** usable cable/landing coverage and any route limitations are documented; a fallback never falsely passes an exact-route requirement.

### EXP-021 — Ingest exchanges and explicit network presence
Status: todo
Depends on: EXP-019, EXP-007

**Files:** `scripts/ingest/adapters/peeringdb.ts`, `src/domain/network-presence.ts`.
**Inputs:** approved current PeeringDB object/relationship endpoints and a tiny guest-access sample.
**Build:** fetch only required facility, IX, network and relationship fields with pagination and bounded depth. Store source object types/IDs and update dates. Exclude personal contacts and any private/restricted fields. Display network presence at facilities separately from physical interconnection claims. Target at least twenty real IX entities in the supported public cohort, with actual geographic coverage reported.
**Verify:** pagination is complete, missing coordinates stay unmapped, repeated relationships deduplicate, deleted records reconcile and no personal-contact endpoint is requested. API failure retains last-known-good data.
**Evidence:** request schema/access test, actual counts, excluded-field audit and source-to-detail examples.
**Done when:** exchanges and network/facility relationships are searchable, correctly typed and supported by published records.

### EXP-022 — Add a small primary-source regulatory layer
Status: todo
Depends on: EXP-019, EXP-009

**Files:** `scripts/ingest/adapters/regulatory-records.ts`, `config/curation/licenses.json`, `src/domain/regulatory.ts`.
**Inputs:** current official FCC/regulator search and filing links verified during this task; the candidate pointer is not a confirmed API.
**Build:** locate and cite at least three public cable-related filings/decisions. Record regulator, jurisdiction, application/decision ID, applicant organization, subject asset, event/status and date precision. Keep application, authorization, transfer and operating service distinct. Manual curation is acceptable for a small cohort; do not build a fictional universal licensing API or copy entire documents.
**Verify:** every subject relationship has evidence; a grant never implies a cable is operating; organizational addresses do not become landing coordinates. Verify source documents and dates, including visually inspecting tables when needed.
**Evidence:** official URLs, brief factual extraction notes and three filing-to-subject traces.
**Done when:** a useful regulatory view exists with explicit editorial scope and no false spatial or operational claims.

### EXP-023 — Implement connectivity search, map and inspectors
Status: todo
Depends on: EXP-020, EXP-021, EXP-022, VLK-045

**Files:** `src/features/connectivity/`, `src/features/map/layers/connectivity.ts`, inspector components.
**Inputs:** validated systems, landings, IXs, network presence and regulatory records.
**Build:** add subtype controls and a legend that distinguishes physical/provider routes from schematic links. Search system/landing/IX names and IDs, select a segment into its parent system, expose landing lists and relevant filings, and preserve the current selection across zoom/projection. Open sources at the exact record/claim rather than an unrelated provider homepage.
**Verify:** a multi-part route remains one selected system; unrelated IX records do not become landing links; hidden routes cannot remain misleadingly highlighted; mixed capacity meanings are not compared in one column. Test unknown fields and unmapped filings in the results-first view.
**Evidence:** five full search→select→inspect→source journeys and contrasting route-semantic screenshots.
**Done when:** connectivity is an interactive domain, not a decorative arc overlay.

### EXP-024 — Pass connectivity correctness and disclosure checks
Status: todo
Depends on: EXP-023

**Files:** `tests/e2e/connectivity.spec.ts`, `tests/data/connectivity-release.test.ts`, `docs/qa/connectivity.md`.
**Inputs:** actual approved connectivity release and production preview.
**Build:** automate system/segment/landing identity, source links, license events, route semantics and error states. Manually inspect three systems, three landings, three IXs and the curated filings against source evidence. Verify notices are visible in both map and source/detail surfaces.
**Verify:** viewport tiles do not inflate counts, pole/date-line paths render safely, unknown capacities stay unknown, missing geometry gives an honest state, and provider failure does not empty a valid release. No unsupported dependency path or traffic flow animation.
**Evidence:** record audit, passing tests, reviewed browser captures and exact limitations.
**Done when:** connectivity behavior and rights/precision disclosures survive independent verification, with any unresolved actual-route gate still explicitly blocked.
