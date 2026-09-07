# ASTRA implementation goal — Valkyrie full portfolio target

Planning revision: 2026-09-07 UTC. **The specification is written; the rendered Power Atlas audit is unfinished and the application has not been built.** Use this as a coding-environment goal, not a claim that autonomous work is already running.

## Mission

Implement Valkyrie in `jdavis-software/valkyrie` as Jordan Davis's original, polished, map-first portfolio application for the physical infrastructure behind energy, compute and connectivity. This is a fun but technically credible public project, not an enterprise platform or authoritative utility operating system.

The full target now includes **96 baseline VLK tasks plus 48 expanded EXP tasks**. The original 96-task v1 is the first release, not the entire global/globe/orbit ambition. Read [the full-target scope and precedence rules](docs/expanded/README.md). Do not quietly stop after VLK-096 or silently turn required expanded features into optional ideas. Conversely, do not interpret the broad vision as authorization for unlimited paid services, private data, SaaS or endless work.

## Recover state before changing anything

Read in this order: `AGENTS.md`; `docs/execution/STATUS.md` and `LOG.md`; `docs/ROADMAP.md`; `docs/expanded/README.md`; the baseline PRODUCT/ARCHITECTURE/EXPERIENCE; expanded IMPLEMENTATION/RESEARCH/REFERENCE_AUDIT; then DATA_SOURCES/DATA_CONTRACTS and the task-specific epic.

Inspect actual branch, worktree, commits, source files, lockfile and issues. Task status is a declaration to verify, not blind proof of correctness. Preserve unrelated work. Work only in Valkyrie and its explicitly assigned worktree. Do not change DriftGate, AvatarOps, global Codex configuration, credentials or machine-wide development tooling.

If planning-only, begin VLK-001. Run both zero-dependency planning validators. Reuse existing working tooling rather than creating a second checker, second app or new plan. Application install/dev/build commands and datasets do not exist merely because the architecture names them.

## Reference and source discovery are real gates

Reference: https://power-atlas.sarvesh-kapre.chatgpt.site/
Original user-supplied X context: https://x.com/_cyberhusky/status/2076018638658896085

The owner reports a data-source panel in the working site. It has not been extracted in this conversation. Public text shows broad navigation labels and a displayed count, not a verified source inventory, technology stack or complete functional specification. Prior administrative failures came from isolated Chromium, not the owner's in-app tab. See `docs/qa/POWER_ATLAS_REINSPECTION.md` and `docs/expanded/RESEARCH.md`.

Complete VLK-003 and EXP-001–006 using an actual rendered public browser session. Follow the 32 scenarios in `docs/expanded/REFERENCE_AUDIT.md`, including all visible source rows/tabs/pages, representative asset inspectors, search, layer/region behavior, mobile and accessible navigation. Record screenshots, actions, after-states, exact source URLs, uncertainty and a feature-to-task matrix. Inspect publicly delivered runtime/network evidence when available; exact private backend recovery is not required.

Do not mark a failed navigation, text extract or supplied Grok prompt as a successful walkthrough. Keep the reference and dependent readiness/design gates unfinished while access is blocked and continue genuinely independent ready work. Do not repeat the same failed access attempt indefinitely or bypass browser policies. An explicit owner-approved waiver is a scope amendment, not evidence of inspection.

The independently researched provider register contains candidates, not confirmed Power Atlas inputs. Keep UI-listed source, asset citation, payload lineage and upstream record match as separate evidence. Publicly visible data is not automatically approved for redistribution.

## Required product

Build the actual atlas as the first screen, not a marketing landing page. Use original Valkyrie branding, native interactive controls, readable typography and a coherent dark design system. Required experiences include Map and Globe modes for terrestrial infrastructure and a separate lazy-loaded Orbit mode; six searchable domains; zoom-dependent detail; source-aware inspectors; domain-compatible comparisons; real project/event timelines; saved/shareable views; six total guided stories; and clear coverage/freshness/methodology surfaces.

The domains are power, grid, compute/AI, projects/queues, connectivity/regulatory context and satellites. Global datasets provide overview where their coverage supports it. The baseline NoVA/DFW packs expand to documented representative European, Chinese and Indian deep dives; they must not be called complete national networks. Preserve native-script names and aliases without inventing translation identities.

The large-catalog target is 200,000 distinct source-backed entities, with separate counts by kind/source/region and explicit hierarchy. It is not an already achieved number. Never count aliases, repeated observations, edges or tiled geometry fragments as more assets, and never fill a shortfall with synthetic production records. A 500,000-record synthetic stress fixture may test engineering limits but cannot substantiate public coverage claims.

## Fixed architectural direction

Use one React + TypeScript + Vite application, pnpm, pinned compatible stable dependencies and a single lockfile. MapLibre GL JS owns ground map and globe rendering. A separate lazy Three.js orbital scene is permitted for the genuine orbital requirement, not as a second competing ground map. Verify projection/worker compatibility in production and dispose or suspend inactive renderers.

Use Node/TypeScript ingestion to produce validated, versioned, attributed, immutable static releases. The browser loads same-origin artifacts, not upstream provider APIs on every visit or pan. Keep compact search catalogs separate from geometry and lazy detailed records. Introduce tiles/PMTiles where measured layer scale warrants them and verify actual host range support; use tested bounded shard fallback rather than automatically adding paid storage or a database.

Use runtime schemas, typed claim/evidence/relationship contracts and reviewed identity crosswalks. Maintain source dates separately from retrieval dates. Keep plant/unit/campus/phase distinctions. Preserve conflicts and nulls. Separate MW/MWh/kV and capacity semantics. Requested generation, requested load, public aggregates, operational assets and contractual relationships are different concepts.

Orbit uses an explicit UTC clock and OMM-compatible JSON with large catalog IDs. Validate SGP4 propagation against independent reference vectors, then verify frame conversion and renderer-axis mapping. A calculated position from dated elements is not live telemetry. Show epoch and age; implement configured stale-element policies with clear limitations.

Vitest/React Testing Library test logic and UI; Playwright verifies real browser journeys. GitHub Actions validates and builds using least privilege. Target `/valkyrie/` static hosting through existing owner permissions. No backend, auth, billing, runtime LLM, live financial data, secret credential requirement or paid provider is required. Do not copy Power Atlas's branding, text, bundles, dataset or screenshots into the product.

## Execution and quality loop

Follow explicit task dependencies, not merely epic number. Keep shared schemas, state, manifest and map adapters under one integration owner. At every coherent slice: implement; run task-specific and regression checks; inspect changed UI in the actual production preview; record evidence; commit; update canonical task cards and execution status; synchronize issue checkboxes when connector access permits; then continue to the next ready task.

Prioritize a real end-to-end vertical slice, factual/source integrity, complete interactions, original visual quality, then measured scale and a truthful portfolio presentation. Do not spend the run on documentation churn, optional frameworks, ornamental animations or an empty impressive shell.

Every UI feature needs actual before/action/after proof. Check 1440×900, 1280×800, 768×1024 and 390×844; keyboard, reduced motion, no-WebGL results, denied clipboard/storage, failed shards/workers, context loss, stale data and offline-after-load. Test production chunks, workers, data and fresh share links under the deployed subpath. A successful build is not a successful user journey or visual review.

Every data adapter needs tiny real input feasibility, exact source version/hash, rights decision, mappings, negative tests and inspected source-to-UI examples. WRI is historical; GEM may have row-level rights exceptions; generation queues are not data-center load queues; aggregated confidential load reports cannot become guessed facility points; cable image permissions are not route-data permissions; CelesTrak JSON must support larger catalog identifiers. Read the research memo rather than guessing.

## Verification, publication and bounded iteration

Run `node scripts/check-plan.mjs --self-test` and `node scripts/check-expanded-plan.mjs --self-test`. These validate structure only. Once application commands exist, run lint, typecheck, unit/UI tests, data validation, independent orbit tests, production build, browser tests and measured performance checks. Record versions, commit/data release, device/browser/network profile and actual results. Never suppress failures by deleting assertions, silently increasing budgets or inventing benchmarks.

Follow baseline VERIFICATION/DEPLOYMENT/PORTFOLIO plus the expanded contracts. Publishing is allowed through existing authorized repository/hosting permissions only. No purchases or new accounts. If remote configuration requires an unavailable owner-only action, preserve the verified build and exact blocker; do not announce the anticipated URL as live.

Complete three useful, documented research→implement→test→review→commit improvement cycles using an evidence-driven gap queue. Publish each valid cycle only when authorized and verified. Stop at the final handoff and leave a ranked next queue; do not promise indefinite background execution. A context boundary requires a recoverable checkpoint, not false completion.

## Final handoff

Report baseline and expanded completion separately; actual reference-audit status; real branch/commit; validated dataset counts, coverage, dates and rights limitations; actual unit/browser/visual/numerical/performance results; public URL only if tested; genuine screenshots/case study/demo script; and exact remaining blockers. A video is optional and must not be claimed recorded if only a script exists. Do not invent traffic, uptime, accuracy, business outcomes or autonomous coding duration.

Begin at the first ready unfinished task. Build and verify the software when its prerequisites are satisfied; do not replace execution with another speculative roadmap.

## Compact launch instruction

> Implement Valkyrie's full portfolio target. Read AGENTS.md, GOAL.md, docs/ROADMAP.md and docs/expanded/README.md; recover actual repository state. Execute the 96 VLK tasks and 48 EXP tasks in dependency order. Complete the real reference/source-panel audit without inventing observations, then build, test, refine, document and publish through available authorized hosting. Keep source evidence, task status, actual test results and blockers synchronized. Do not stop at the smaller baseline release or claim indefinite background work.
