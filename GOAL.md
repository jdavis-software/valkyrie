# ASTRA implementation goal — Valkyrie v1

Paste the following instruction into the coding environment's `/goal` workflow, or use it as an ordinary implementation prompt when that workflow is not available. This document does not assume any particular model runtime, duration, or autonomous-tool capability.

---

Implement **Valkyrie v1** in `jdavis-software/valkyrie`: an original, exceptionally polished, map-first portfolio application for exploring energy, compute, and connectivity infrastructure.

The owner is Jordan Davis. This is a fun but technically credible public portfolio project, not a commercial infrastructure platform. The planning documents are already written. Your job is to implement, test, refine, document, and prepare the actual application for demonstration—not produce another speculative roadmap.

## Start by recovering the current state

Read `AGENTS.md`, `docs/execution/STATUS.md`, `docs/execution/LOG.md`, `docs/ROADMAP.md`, and all eleven core specifications linked there. Inspect the actual working tree and existing implementation. Treat task-card status as something to verify, not blind proof that code works. Identify the first ready unfinished `VLK-*` task and execute it.

If the repository is still planning-only, start at VLK-001. Do not assume `pnpm dev`, dependencies, datasets, screenshots, CI, or a deployed site already exist. Establish them through the foundation tasks. Preserve existing work and avoid unrelated repositories or global development configuration.

## What the finished application must do

Deliver a full-screen, original dark atlas interface with a compelling world overview, a regional deep-dive experience, smooth but restrained camera motion, meaningful layer controls, command-palette search, filters, an accessible result list, and a source-aware facility inspector.

The baseline includes a real historical global power-plant inventory; two documented regional packs for grid and data-center exploration; small evidence-backed project and connectivity collections; comparable facility metrics; labeled geographic context; three guided stories; reproducible saved/shareable views; and a clear methodology/data-health surface. Global and regional coverage must be visibly different. Do not describe a regional sample as worldwide coverage or an old inventory as a live feed.

Use the interaction pattern of https://power-atlas.sarvesh-kapre.chatgpt.site/ as inspiration, not as a technical specification. The original X link is https://x.com/_cyberhusky/status/2076018638658896085. Inspect the reference through normal public browsing when available, capture notes locally, and record what was actually observed in `docs/REFERENCES.md`. Do not copy its branding, source code, text, dataset, or unverified object count. If the site is inaccessible, continue using the written Valkyrie specification; reference access is not a release dependency.

## Fixed implementation decisions

- Single repository, single React + TypeScript + Vite web application; pnpm; current compatible stable dependencies pinned in a lockfile.
- MapLibre GL JS owns rendering. Use its built-in sources/layers, clustering, feature selection and camera APIs. Do not introduce a second renderer without a measured need and an architecture decision.
- Node/TypeScript ingestion scripts create versioned, attributed, reproducible, static artifacts. The default app uses local/same-origin data without API keys.
- Start with bounded GeoJSON and compact catalog/detail shards. Upgrade only the layer that exceeds measured budgets; PMTiles is a later scale path, not a prerequisite.
- Natural Earth-derived, locally served overview geography is the default keyless map background. This is intentionally not a street map. Additional geographic detail comes from the licensed regional packs.
- Vitest + React Testing Library for logic/UI tests and Playwright for browser verification. GitHub Actions validates and builds; deployment targets a `/valkyrie/` static base path compatible with GitHub Pages.
- No backend, auth, subscriptions, runtime AI, live financial quotes, private datasets, sensitive facility information, paid map services, or ongoing operational dependency is needed.

## Execute the roadmap, not just the first milestone

There are 12 ordered epics and 96 explicit v1 task cards. Each card has dependencies, implementation targets, behavior, and proof requirements. Work in dependency order; parallelize only genuinely independent work. Keep contracts and shared state integration coordinated. Never mark an epic done merely because all code files were created.

At each completed slice: run relevant checks, inspect any changed UI, commit, update canonical task statuses and the execution log, and continue. If an external provider fails, use the documented fallback and record the exact limitation. Never generate fake production data to satisfy record targets. If a required real-data release gate remains blocked, keep the release incomplete and finish independent work.

## Quality priorities

First, a working end-to-end vertical slice with real data. Second, data integrity and clear provenance. Third, a cohesive, original interface. Fourth, performance, accessibility and resilience. Fifth, an honest portfolio presentation. Do not spend the whole run creating infrastructure, documentation churn, ornamental animations, or optional features.

Pay special attention to coordinate order, duplicate entities, geometry parts versus facility counts, unknown numeric values, MW versus MWh, source dates versus download dates, proposed versus operating status, physical connections versus contracts, and evidence quality versus a decorative confidence score. Nearby infrastructure must never be presented as verified supply.

The visible app should feel finished: no blank map, dead controls, unexplained loading state, tiny labels, inaccessible dialogs, unbounded lists, accidental mobile overflow, or generic dashboard filler. Inspect 1440×900, 1280×800, 768×1024 and 390×844 layouts, keyboard-only flow, reduced-motion flow and WebGL-unavailable flow. Test the production build at the deployed subpath, including workers and data URLs; development-mode success is insufficient.

## Mandatory completion evidence

Run the command contract in `docs/ARCHITECTURE.md` after it exists: lint, typecheck, unit/UI tests, data validation, plan validation, production build and browser tests. Record actual results with tool/runtime versions and reproducible commands. Resolve real app console errors, orphaned event listeners, corrupted data artifacts and inaccessible controls. Do not fake results or remove failing assertions.

Follow `docs/VERIFICATION.md` for functional, data, accessibility, performance, security and degraded-mode gates. Follow `docs/DEPLOYMENT.md` for a least-privilege static deployment. Publishing is allowed only through the owner's existing repository/hosting permissions; no purchases or new accounts. If Pages configuration is unavailable, produce the verified build and deployment workflow and explicitly report the exact owner-only blocker.

Create the portfolio deliverables in `docs/PORTFOLIO.md`: factual README, genuine screenshots, three working story links, source methodology, architecture case study, an actual reproducible demo script, and a release report. A video may be recorded when the available tools support it; otherwise ship screenshots and the script and say video was not recorded. Do not invent uptime, accuracy, scale, traffic, benchmark results, or business outcomes.

## Final report to Jordan

Report the repository branch/commit, live URL only if verified, completed versus blocked tasks, actual test and browser results, actual dataset counts and coverage, data freshness/limitations, included portfolio artifacts, and any remaining owner-only steps. Provide the exact next command/task if unfinished. Do not imply that the original Power Atlas's internal implementation was recovered.

Begin implementation now at the first ready task and continue through the required v1 release gates.

---

## Compact launch instruction

> Implement Valkyrie v1 end to end in this repository. Read AGENTS.md and GOAL.md first, recover docs/execution/STATUS.md, and execute all 96 required tasks in docs/ROADMAP.md in dependency order. Follow the fixed architecture, data-integrity rules, verification gates and portfolio checklist. Build and verify the real application; do not stop at another plan or a mock dashboard. Record progress and blockers honestly.
