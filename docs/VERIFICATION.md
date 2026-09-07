# Verification and release gates

All numbers here are **engineering acceptance budgets**, not measured results. Actual evidence must identify application commit, dataset release, browser/version, device/runner, viewport and test profile. Do not claim performance or accessibility outcomes until measured.

## 1. Required environments

Local development is useful, but release QA runs the production build served at `/valkyrie/`. Required screen sizes: 1440×900 desktop, 1280×800 laptop, 768×1024 tablet and 390×844 mobile. Run Chromium automation; add a real available Safari/WebKit/Firefox smoke pass and report precisely which engine was tested. A WebKit automation pass is not equivalent to testing every Safari/iOS device.

The no-WebGL path is mandatory. Reduced-motion, keyboard-only, clipboard-denied, localStorage-denied and offline-after-load scenarios are mandatory. Cold-start offline support is not promised by the baseline and must not be described as verified unless separately implemented.

## 2. Functional acceptance matrix

| Gate | Required proof |
|---|---|
| F01 Initial load | Meaningful shell, real geography/assets, valid source/version indicator and no app console/worker error |
| F02 Search | Exact ID/name and ambiguous names behave; keyboard selection opens the correct detail |
| F03 Filtering | Map/list/summary use one predicate; unknown-capacity/empty-category/zero-match semantics pass |
| F04 Regional packs | Both real packs load, category toggles change geometry, obsolete loads do not win races |
| F05 Inspector | Correct identity, typed facts, precision, dates and supporting evidence for sampled records |
| F06 Relationships | Only documented edges under relationships; proximity remains separately labeled derived context |
| F07 Compare | Two–four assets, compatible quantities only, unknowns visible, mixed-type comparison safe |
| F08 Stories | Three real stories, every step/subject/evidence reference valid, controls/deep links/exit restoration work |
| F09 Sharing | Fresh-context URL round trip, Back/Forward and denied-clipboard fallback work |
| F10 Persistence | Saved views survive valid reloads; bad/quota-denied/old-schema state recovers |
| F11 Accessibility | Complete results-first and keyboard-only journeys; focus/labels/contrast/motion manually reviewed |
| F12 Failure modes | Failed shard/map/worker, unknown URL/asset and offline-after-load have useful bounded recovery |
| F13 Production host | Direct query link, worker chunk, lazy import, data release and geography resolve under the actual base path |

For UI verification, record the exact action and observable state change. A screenshot alone cannot prove a filter changed the real result set. A test click alone cannot prove the UI is readable; inspect the resulting screenshot.

## 3. Data quality gates

Zero tolerance: synthetic production records; unknown→zero conversion; invalid/nonfinite coordinates or quantities; duplicate canonical IDs; orphaned evidence/relationships; unapproved source publication; leaked credentials/personal contacts; invented physical links; incorrect hash/pointer; and silently missing required categories.

Real-data cohort gates: pinned global WRI inventory with valid geocoded records; both regional packs containing real grid lines/substations; at least ten real compute facilities across them; five real project records and five real connectivity-specific records. The selected examples must meet evidence requirements, not just a numeric quota. If a target cannot be met, keep the release gate open and document the exact shortfall.

Audit at least three records per category against upstream evidence and all factual claims in the three curated stories. Track rejected rows and reasons, alias/merge decisions, original precision and missing fields. Check broad source-count changes during refresh; a drop greater than 20% or increase greater than 50% relative to the previous source partition requires review, not an automatic rejection/approval. These thresholds are chosen change-review triggers, not claims about expected real data growth.

## 4. Performance and payload budgets

Baseline profile: production Chromium, 1440×900, cold HTTP cache, an explicitly documented 4× CPU slowdown where available, and approximately 10 Mbps/100ms-latency network shaping. Record the actual tool settings; runners differ. Run five trials, report median and worst result, not a single cherry-picked run. Repeat key flows with the actual region data.

| Metric | Initial target | Enforcement |
|---|---|---|
| Initial application JavaScript, excluding lazy map chunk | ≤250 KiB gzip | Deterministic build check |
| Map/worker JavaScript required for first map | ≤800 KiB gzip combined | Deterministic build check, report files individually |
| First meaningful map's geography + initial asset payloads | ≤3 MiB gzip | Artifact/build report |
| Entire core published dataset | ≤75 MiB uncompressed; no single file >10 MiB | Deterministic artifact gate; lazy partitioning for individual files |
| Initial usable shell | ≤1.5 s median in profile | Measured report; environment-aware regression gate |
| First meaningful map | ≤4 s median in profile | Measured report with current data release |
| Search response after indexed data is ready | ≤100 ms p95 over at least 100 representative queries | Worker/query benchmark |
| Visible UI response to ordinary toggle/selection | ≤150 ms median excluding uncached data/network time | Browser measurement |
| Region switch with required data cached | ≤300 ms median to stable visible state | Browser measurement |
| Repeated navigation | 50 selection/region/story cycles without accumulating live maps/workers/listeners | Correctness/resource lifecycle gate |
| Share URL | ≤2,000 characters for supported baseline views | Unit/property test |

The total-data budget includes separate geometry, compact catalog, evidence and detail artifacts; it is not an initial-download allowance. Partitioning reduces per-request payloads, not total bytes. If total size fails, remove redundant serialized fields, improve representation or propose an evidence-backed budget amendment; do not silently drop valid source records or pretend splitting files reduces aggregate size.

Gzip sizes are comparative build measurements; verify what the actual host transmits rather than assuming the host serves the measured encoding. Measure initial network requests, not just total build folder size. If budgets fail, profile and optimize; document any justified revised budget and its rationale rather than hiding the failure. Do not claim 60 FPS, low memory or hundreds of thousands of real assets from a synthetic test.

## 5. Automated test layers

Unit/domain: ID generation, sorting/ranking, filter predicates, quantities, date precision, geometry helpers, status mapping, URL codecs and relationship rules. Include null/zero/empty, malformed tags, ambiguous aliases, multi-part geometry and antimeridian cases.

Adapter/integration: approved real source samples and deterministic transforms; source lock/terms gates, request retry limits, corrupted responses, publication atomicity, cache and manifest validation. Normal CI is offline with respect to provider data.

Component: dialog focus, search keyboard, source badges, empty/error states, typed fact formatting, compare compatibility and story controls. Assert accessible behavior rather than brittle implementation details.

Browser: production-preview primary journeys, four layouts, all scoped categories, invalid/missing data, deep links, clipboard/storage failures, worker races and WebGL unavailable. Use stable semantic locators; prefer real behavior over arbitrary sleeps.

Visual: capture the active original design baseline and actual implemented states; inspect typography, layout, map/data visibility, color/legend cues, attribution, motion and mobile composition. Map screenshot comparison must accommodate nondeterministic GPU rasterization without masking genuine layout regressions.

## 6. Security and reliability review

Treat dataset text/URLs/manifest paths and saved-view names as untrusted. Never use raw HTML for source fields. Validate protocol/length/path traversal; limit query/list sizes; redact secrets from logs. External links use safe opener behavior. Default runtime requests are same-origin; review any additional external dependency.

Review dependency advisories and license obligations, identifying real applicability rather than merely echoing scanner severity. Block on confirmed release-relevant vulnerabilities, leaked secrets or unapproved redistribution. Keep raw ingestion caches/HARs outside Git. No analytics is required in v1.

Do not add a CSP that prevents MapLibre workers or required assets without testing it. GitHub Pages does not imply arbitrary response-header configuration; use only supported mechanisms and document limitations instead of pretending a header policy is deployed.

## 7. Evidence report template

```text
Task/gate IDs:
Application commit and dataset release:
Environment/browser/viewport/profile:
Commands executed:
Assertions and observed behavior:
Pass/fail/skipped with reasons:
Screenshot/trace/report paths:
Measured values and sample counts:
Known limitations and untested configurations:
Fixes made and rerun evidence:
```

Keep large transient traces in CI artifacts or gitignored local output. Commit concise reports and a small set of portfolio screenshots. A checkbox without evidence is not release certification.

## 8. Stop conditions

A required journey fails; production map/worker is blank; counts or facts are materially wrong; unverified live/supply claims remain; data rights or provenance are unresolved; mobile/keyboard experience is blocked; a required test is skipped without equivalent evidence; or the final URL has not been verified. Continue fixing independent issues, but do not announce v1 complete while a required gate is open.
