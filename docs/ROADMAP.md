# Valkyrie implementation roadmap

## How to execute

This is a dependency-ordered, bounded v1 plan: **12 epics, 96 required tasks**. Every task starts `todo`. The planning work does not mean any application task is complete. Canonical task cards are in the linked epic documents; GitHub epic checklists are convenient summaries. Read `AGENTS.md` for execution/status rules and `GOAL.md` for the launch prompt.

Select the lowest-numbered ready task, inspect its dependencies and acceptance criteria, implement it, verify it, and record evidence before changing status. All listed dependencies must be done unless a documented scope amendment explicitly changes the contract. Do not equate code presence with feature completion.

## Epic index

| Epic | Task range | Outcome | Reference |
|---|---|---|---|
| E00 | VLK-001–008 | Evidence, bounded scope, versions and feasibility | [Readiness](roadmap/E00-readiness.md) |
| E01 | VLK-009–016 | Runnable, typed, modular app foundation | [Foundation](roadmap/E01-foundation.md) |
| E02 | VLK-017–024 | Reproducible validated data toolchain | [Data pipeline](roadmap/E02-data-pipeline.md) |
| E03 | VLK-025–032 | Real approved world and regional datasets | [Dataset publication](roadmap/E03-datasets.md) |
| E04 | VLK-033–040 | Reliable, performant map and layer interactions | [Map engine](roadmap/E04-map.md) |
| E05 | VLK-041–048 | Search, filters, results and evidence inspector | [Exploration](roadmap/E05-exploration.md) |
| E06 | VLK-049–056 | Domain-specific layers and honest relationships | [Infrastructure](roadmap/E06-infrastructure.md) |
| E07 | VLK-057–064 | Compare, stories, share and signature polish | [Showcase interactions](roadmap/E07-showcase.md) |
| E08 | VLK-065–072 | Mobile, accessibility and degraded modes | [Resilience](roadmap/E08-resilience.md) |
| E09 | VLK-073–080 | Measured correctness, performance and security | [Verification](roadmap/E09-verification.md) |
| E10 | VLK-081–088 | CI, reviewable refresh and verified deployment | [Delivery](roadmap/E10-delivery.md) |
| E11 | VLK-089–096 | Honest portfolio assets and release handoff | [Portfolio release](roadmap/E11-portfolio.md) |

## Milestone gates

**M0 — Ready to build:** E00. Reference uncertainty is documented, source feasibility checked, original design contract recorded and package compatibility tested. No need to perfectly identify the original application's stack.

**M1 — First real vertical slice:** E01/E02 plus a real approved geography/plant partition and E04 through VLK-037. App opens, real points render, a selection can be inspected at least through a simple temporary view, and source IDs survive. Temporary development UI is removed by E05.

**M2 — Complete explorer:** E03–E06. All scoped categories, search/filter/result/inspector behavior and source/relationship semantics work. Real-data coverage gates pass.

**M3 — Portfolio-quality experience:** E07/E08. Three stories, comparisons, persistent/shareable state, all screen sizes, keyboard access and failure modes are genuinely usable.

**M4 — Release candidate:** E09/E10. Actual tests and measured budgets pass; production subpath is tested; deployed URL is verified or the exact owner-only blocker remains explicitly open.

**M5 — Portfolio release:** E11. README/screenshots/case study reflect the actual release; final report distinguishes code, QA, data and publication status.

## Universal definition of done

A task is done only when its specified behavior is implemented, task-specific checks pass, affected regressions pass, relevant docs are accurate, and execution evidence is recorded. UI tasks also need browser interaction proof and screenshots inspected at applicable sizes. Data tasks need source/terms/record provenance and no synthetic production records. Publication tasks need actual remote confirmation, not a planned URL.

Record `Status: todo|in_progress|blocked|done|deferred` on each task card. An evidence entry contains task IDs, date, commit or pending commit note, commands, results, screenshot/trace/report paths, known limitations and next action. Never hide a failed check by changing a budget, dropping a test or rewriting the acceptance target without a justified ADR.

## Parallel work and integration

After foundation, independent source adapters may be built separately using the shared schema. UI shell can progress while data imports run. Search/inspector work waits for canonical IDs and fixtures. One owner coordinates schema, manifest, state and map-adapter changes. Do not launch multiple agents editing shared contracts simultaneously. Integration is complete only after combined app/browser tests.

## Scope discipline

No calendar estimates are required. Track completed behavior and blocked dependencies, not fabricated hours or percentages. `docs/FUTURE.md` is excluded from the default goal. If the reference changes, finish the written v1 rather than continually chasing it. If a required data/provider gate fails, use an approved documented fallback or keep that requirement blocked; do not quietly ship false data.

## Core specification shelf

[Product](PRODUCT.md), [Architecture](ARCHITECTURE.md), [Experience](EXPERIENCE.md), [Data sources](DATA_SOURCES.md), [Data contracts](DATA_CONTRACTS.md), [References](REFERENCES.md), [Decisions](DECISIONS.md), [Verification](VERIFICATION.md), [Deployment](DEPLOYMENT.md), [Portfolio](PORTFOLIO.md), [Future scope](FUTURE.md).

Progress: [status](execution/STATUS.md), [execution log](execution/LOG.md), [GitHub epic index](execution/ISSUES.md).
