# Domain contracts and invariants

Implement these contracts as Zod schemas in `src/domain/`; export inferred TypeScript types. Example field names below are normative. Additional fields need a documented migration, not an untyped escape hatch. Schema examples describe structure, not real data records.

## 1. Identifiers and entities

`AssetId` is a stable namespaced string such as `wri:plant:<gppd_idnr>`, `osm:way:<id>`, or `curated:project:<stable-slug>`. Never derive identity from current display name, coordinates alone, array index or random UUID at build time. A canonical alias table may map multiple source records to one reviewed entity; retain every source record.

An asset has:

```ts
type AssetKind =
  | 'power_plant' | 'substation' | 'transmission_line'
  | 'data_center' | 'project' | 'connectivity_facility'
  | 'telecom_route';
type ReportedStatus =
  | 'operating' | 'construction' | 'proposed' | 'retired'
  | 'cancelled' | 'unknown';
type LocationPrecision = 'source_geometry' | 'facility' | 'city' | 'region' | 'unknown';

type Asset = {
  id: string;
  kind: AssetKind;
  name: string;
  aliases: string[];
  sourceRecordRefs: string[];
  countryCode: string | null;
  regionIds: string[];
  status: ReportedStatus;
  statusEvidenceId: string | null;
  location: {
    geometryRef: string | null;
    representativePoint: [number, number] | null;
    representativePointMethod: 'source' | 'point_on_surface' | 'city_reference' | null;
    precision: LocationPrecision;
  };
  facts: Fact[];
  evidenceIds: string[];
  relationshipIds: string[];
};
```

A missing geometry is acceptable for a non-map project result, but must not be converted to [0,0]. Geographic coordinates are [longitude,latitude], finite, longitude [-180,180], latitude [-90,90]. A valid [0,0] should not be rejected solely by value; require corroborating source context and flag suspicious missing-coordinate patterns.

Canonical IDs count assets. Geometry-part IDs count display primitives. Deduplication must not silently merge a generating unit into an entire plant or a building into a campus.

## 2. Facts and quantities

```ts
type QuantityKind =
  | 'generation_nameplate_capacity'
  | 'annual_electricity_generation'
  | 'reported_facility_power_demand'
  | 'line_voltage'
  | 'storage_energy_capacity';

type Fact = {
  key: string;
  value: string | number | boolean | null;
  quantityKind: QuantityKind | null;
  unit: 'MW' | 'MWh' | 'GWh' | 'kV' | null;
  evidenceId: string;
  effectiveDate: string | null; // ISO date/year as supported by separate precision
  datePrecision: 'day' | 'month' | 'year' | 'unknown';
  qualifier: 'reported' | 'estimated_by_source' | 'derived';
  derivationId: string | null;
};
```

Null means not reported. NaN/Infinity/negative capacity are rejected unless a specific signed quantity is explicitly introduced. Preserve a zero from a valid provider record; do not use `Number('')`. Normalize MW/kW or volts/kV only with a documented unit conversion and the raw value retained in source records. Multi-valued voltage strings are arrays of parsed values, never a single arbitrary maximum presented as original text.

Only identical quantity kinds, units and compatible scopes/time periods can be aggregated or plotted together. A plant's rated capacity is not current generation; a data center's published design demand is not available compute. A `year` value cannot become January 1 of that year without marking it as a display convention, not an observed date.

## 3. Source records and evidence

`SourceRecord` preserves `sourceId`, original ID, original field values used, record URL, publication/observation time when available, retrieval time, source release, content hash and transformation version. Keep only necessary fields; no personal contacts or excessive article text.

```ts
type Evidence = {
  id: string;
  sourceId: string;
  sourceRecordId: string;
  url: string;
  title: string;
  publisher: string;
  publishedAt: string | null;
  observedAt: string | null;
  retrievedAt: string;
  supports: string[]; // concrete field paths or story-claim IDs
  limitations: string[];
};
```

Evidence URLs are validated http/https URLs, length-bounded, without credentials or javascript/data schemes. Factual story copy references evidence IDs. One announcement about a company's expansion does not establish every associated facility's size, status and location.

Do not store a decorative confidence percentage. Store fact-level provenance and explicit limitations. A provider assertion can be `reported` without being independently cross-checked. Retrieval success does not upgrade epistemic certainty.

## 4. Relationships and derived nearby context

```ts
type Relationship = {
  id: string;
  fromId: string;
  toId: string;
  kind: 'owned_by' | 'operated_by' | 'documented_connection'
    | 'power_purchase_agreement' | 'project_of' | 'located_within';
  evidenceIds: string[];
  effectiveFrom: string | null;
  effectiveTo: string | null;
  limitations: string[];
};
```

Organization records live in their own catalog and can be relationship endpoints. A stock ticker is an organization alias with exchange/context and evidence, not an identity key. Unsupported owner/operator matches remain raw text, not graph edges.

`NearbyResult` is a separate derived type: origin ID, candidate ID, straight-line surface distance, distance unit, algorithm version, candidate coverage and caveat. It is not a `Relationship`. Baseline point-to-point distances use documented representative points and are labeled approximate. Do not label that distance 'distance to grid connection' or 'nearest line distance'. A future point-to-line calculation requires a different method and explicit tests. Never rank infrastructure by vulnerability or claim site suitability.

## 5. Geometry and map features

Store GeoJSON feature geometry and minimal map properties: `assetId`, `partId`, `kind`, filter fields, and selection display name only if required. Keep verbose facts and evidence in detail shards. Polygons maintain valid rings/holes, multipart assets maintain common IDs, lines need at least two distinct positions. Simplification tolerance and source resolution belong in manifest metadata.

Representative points must fall on/within the intended feature when required; the geometric centroid of a concave polygon may be outside. Use a tested point-on-surface method and store its derivation. Do not use a polygon centroid to claim an entrance or equipment location.

Cross-antimeridian geometry and world copies need explicit handling. Treat duplicated rendered copies as one catalog asset. Feature state IDs must survive source reloads through stable IDs/promoteId configured for the selected MapLibre version.

## 6. Release manifest

```ts
type ReleaseManifest = {
  schemaVersion: 1;
  releaseId: string;
  createdAt: string; // locked publication metadata, not per-transform clock noise
  inputs: { sourceId: string; version: string; sha256: string; retrievedAt: string }[];
  artifacts: {
    path: string; // relative to this release, no '..' traversal
    mediaType: string;
    sha256: string;
    bytes: number;
    sourceIds: string[];
    assetCount: number | null;
  }[];
  coverage: {
    sourceId: string;
    regionIds: string[];
    temporalLabel: string;
    completeness: 'source_inventory' | 'regional_extract' | 'editorial_sample';
    exclusions: string[];
  }[];
  statistics: { uniqueAssetCount: number; byKind: Record<string, number>; missingFacts: Record<string, number> };
  warnings: string[];
};
```

The `current.json` pointer carries `releaseId`, manifest path and manifest hash. Artifacts cannot escape the release directory or change source/terms without validation. Data health reflects both load status and source-age limitations.

## 7. Queries, persistence and worker messages

Define `FilterState` with category IDs, countries/regions, fuel/status, and optional capacity range. Query/filter functions are pure. Derived metrics use the same result ID set. `SearchRequest` and response contain monotonically increasing `requestId`; ignore old responses and terminate workers on cleanup. Search has input length and result limits.

`ShareStateV1` includes version, permitted region/layers/filter values, selected asset ID, comparison IDs (max 4), story/step if active, and clamped camera. Validate before applying. Unknown source IDs or old release references yield a recoverable explanation, not an exception or redirect.

## 8. Test fixture contract

Use `fixture:` namespaces for fake records and `perf:` for generated scale tests. Production validation rejects both prefixes and any `isSynthetic=true` record. Real sample fixture subsets retain provider attribution and original IDs, with fixture metadata kept outside the record. Test zero, null, malformed units, duplicate source IDs, conflicting ownership, expired statements, missing geometry, antimeridian lines, city-level projects and unknown status.
