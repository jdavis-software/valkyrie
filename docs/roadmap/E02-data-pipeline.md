# E02 — Domain and reproducible ingestion

Goal: data transforms are typed, auditable, deterministic and separate from ordinary app builds.

### VLK-017 — Implement runtime schemas
Status: todo
Depends on: VLK-011

**Files:** `src/domain/schemas/`, domain unit tests.
**Build:** implement Asset, Fact, Evidence, SourceRecord, Organization, Relationship, geometry-reference and release-manifest schemas from DATA_CONTRACTS. Define schema versioning and bounded strings/arrays. Infer types rather than maintaining duplicate interfaces.
**Verify:** valid/minimal records pass; malformed dates, IDs, geometry, unknown enums and nonfinite numbers fail with actionable paths.
**Done when:** all ingestion and loader entry points can validate untrusted input consistently.

### VLK-018 — Implement stable identity and deduplication
Status: todo
Depends on: VLK-017

**Files:** identity helpers, canonical-alias registry and tests.
**Build:** generate namespaced IDs and a reviewed cross-source alias mechanism. Keep node/way/relation namespaces distinct. Track campus/building and plant/unit granularity. Treat approximate name/coordinate matches as candidates for review, not automatic merges.
**Verify:** renamed assets retain IDs; colliding numeric IDs across types do not merge; multipart geometry counts once; ambiguous candidates remain separate with warnings.
**Done when:** reproducible IDs and a deduplication report prevent inflated facility counts.

### VLK-019 — Implement quantities, dates and evidence rules
Status: todo
Depends on: VLK-017

**Files:** units/date/evidence helpers and relationship validators.
**Build:** normalize known units while retaining raw fields, preserve null and real zero, support date precision, and require evidence for factual assertions and graph edges. Keep proximity outside the relationship schema. Organization tickers require context/evidence.
**Verify:** fixtures cover blank strings, multi-voltage values, MW/MWh confusion, unknown status, source-estimated facts and unsupported relationships.
**Done when:** false precision and semantically invalid aggregation are rejected before rendering.

### VLK-020 — Create source registry and locked inputs
Status: todo
Depends on: VLK-004, VLK-017

**Files:** `config/sources.json`, `config/sources.lock.json`, `config/regions.json`.
**Build:** encode approved source IDs, terms decisions, coverage, acquisition methods, release versions, URLs, hashes, retrieval dates and notices. Keep pending/blocked candidates out of publication. Separate original-code license from dataset terms.
**Verify:** missing rights decisions, unpinned inputs and path traversal fail validation; chosen bboxes use the declared order.
**Done when:** every input has a reproducible identity and auditable publication decision.

### VLK-021 — Build controlled acquisition tools
Status: todo
Depends on: VLK-020

**Files:** `scripts/data/fetch.ts`, source adapters, gitignored raw cache.
**Build:** implement explicit network ingestion with timeouts, max bytes, identifying user agent, conservative retry/backoff, lockfile checks, checksums and cached response metadata. Respect source usage policies; no browser imports. Optional secrets remain process environment values and are redacted from logs.
**Verify:** mock 200/304/429/500, timeout, truncated data, oversized response and checksum mismatch. Retries are bounded and do not destroy valid cache.
**Done when:** acquisition fails clearly and cannot hammer providers or silently change inputs.

### VLK-022 — Build deterministic transformations and partitions
Status: todo
Depends on: VLK-018, VLK-019, VLK-021

**Files:** `scripts/data/normalize.ts`, partition/serialize helpers.
**Build:** transform source-specific raw data to canonical records, slim geometry, search catalog and detail shards. Sort stable IDs; document geometry simplification and representative points. Keep volatile timing outside payload transforms. Quarantine malformed records with reason counts.
**Verify:** identical locked inputs produce byte-identical normalized outputs; different input ordering does not change content. Boundary/multipart and null-field fixtures preserve semantics.
**Done when:** output size and provenance can be explained and reproduced offline from cached inputs.

### VLK-023 — Enforce publication invariants
Status: todo
Depends on: VLK-022

**Files:** `scripts/data/validate.ts`, domain/integration tests.
**Build:** validate unique IDs, geometry, units, evidence links, artifact hashes, rights notices, source versions, per-kind counts, missingness and fixture rejection. Detect orphan relations/story references and unexpected personal fields. Return machine-readable and readable reports.
**Verify:** intentionally corrupted fixtures fail each gate without modifying approved release data. Counts refer to assets, not geometry parts.
**Done when:** a production artifact cannot pass merely because it is syntactically valid JSON.

### VLK-024 — Implement atomic release publishing and offline consumption
Status: todo
Depends on: VLK-023

**Files:** release builder/pointer tools, `src/data/manifest.ts`, `src/data/repository.ts`.
**Build:** publish to immutable release directories, calculate payload hashes, then update `current.json` only after complete validation. Implement base-aware, cached, abortable loaders with path whitelists and request deduplication. Ordinary app builds use committed approved outputs, not provider calls.
**Verify:** interrupted/invalid refresh leaves old pointer intact; wrong hash/schema fails recoverably; build succeeds with provider networking disabled once artifacts exist.
**Done when:** last-known-good data and reproducible static delivery work end to end.
