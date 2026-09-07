# Valkyrie

**Explore the infrastructure behind energy, compute, and connectivity.**

Valkyrie is Jordan Davis's independent portfolio project: an original map/globe/orbit experience for exploring source-backed physical and digital infrastructure.

> **Planning package published; reference audit unfinished; application not built.** The repository contains 96 baseline task cards plus 48 expanded task cards, source research, implementation contracts and structural validation tooling. No production datasets, runtime benchmarks, application screenshots or live demo are claimed yet.

## Start here

| Entry point | Purpose |
|---|---|
| [GOAL.md](GOAL.md) | Full ASTRA implementation assignment and execution rules |
| [AGENTS.md](AGENTS.md) | Agent boundaries, evidence standards and progress recovery |
| [Baseline roadmap](docs/ROADMAP.md) | 96 VLK tasks for the first working release |
| [Full portfolio roadmap](docs/expanded/README.md) | 48 EXP tasks extending the baseline to the six-domain target |
| [Implementation contracts](docs/expanded/IMPLEMENTATION.md) | Modules, schemas, data delivery, orbit math, performance and test contracts |
| [Reference audit](docs/expanded/REFERENCE_AUDIT.md) | 32 browser scenarios and exhaustive visible source-panel capture requirements |
| [Research findings](docs/expanded/RESEARCH.md) | Primary-source findings and what remains unknown about Power Atlas |
| [Candidate source register](docs/expanded/SOURCE_REGISTER.json) | Independently researched inputs; not a recovered reference source list |
| [Execution status](docs/execution/STATUS.md) | Actual progress, blockers and next action |
| [Baseline GitHub epics](docs/execution/ISSUES.md) | Original issues #1–#12 linked to their canonical cards |

## Full portfolio target

Map and Globe views for power, grid, compute/AI, projects and connectivity, plus a separate calculated Orbit mode for satellites. Search, filters, source-aware inspectors, compatible comparisons, dated project/event context, saved/shareable views and six guided stories are planned. The initial NoVA/DFW deep dives expand to documented representative areas in Europe, China and India. Broad source coverage is not the same as complete worldwide topology.

The baseline v1 is the first usable release. The expanded addendum promotes globe switching, satellites, cable/IX/regulatory modeling, broader ground coverage, large-catalog delivery and bounded improvement cycles into the full goal. Unrelated SaaS, billing, private data and runtime AI remain outside scope.

The scale target is **200,000 distinct source-backed catalog entities**, not a current result or a promise that all are facilities of the same granularity. Counts must distinguish stations, units, grid features, campuses and other entity kinds; geometry fragments, aliases and repeated provider observations do not inflate totals. Synthetic stress-test records never enter production data or coverage claims.

## Architecture direction

React + TypeScript + Vite, MapLibre GL JS ground map/globe, a lazy isolated orbital scene, worker queries, typed source/claim/relationship contracts and versioned static data. Node/TypeScript ingestion prepares approved inputs centrally; the app does not call upstream data providers per visitor. Dense layers use tested partition/tile delivery as needed. Exact package versions are selected and tested during implementation.

No account, paid map API, application backend, database service, Kubernetes or runtime AI dependency is required. This is Valkyrie's proposed architecture, not a finding about Power Atlas's internals.

## Evidence and source integrity

The original site's rendered source drawer has not been captured. Candidate providers in the research register must not be labeled confirmed Power Atlas inputs without real observation. A failed browser attempt or an open URL does not complete a reference audit.

Every public asset and factual story needs traceable evidence. Historical inventories stay historical; unknown values stay unknown; geographic proximity is not verified supply; large-load aggregates are not guessed facilities; cable routes require actual rights and geometry evidence; propagated satellite positions are calculations from dated elements, not live telemetry.

## Validate the planning structure

With Node 18 or later, without application dependencies:

```bash
node scripts/check-plan.mjs --self-test
node scripts/check-expanded-plan.mjs --self-test
```

The checks validate baseline/expanded task coverage, statuses, dependencies, cycles, required card sections, relative links and declared source evidence states. They do not certify source rights, external URLs, a completed browser audit, application correctness or deployment. Application commands and a lockfile will be added by implementation tasks.

## Launch

```text
Implement Valkyrie's full portfolio target. Read AGENTS.md and GOAL.md,
then docs/ROADMAP.md and docs/expanded/README.md. Recover repository state
and execute all 96 VLK plus 48 EXP tasks in dependency order. Complete
the real reference/source-panel audit; never invent observed features.
Build and verify the actual app, maintain evidence and task statuses,
and report any real data, browser, performance or deployment blockers.
```

## Baseline specification shelf

[Product](docs/PRODUCT.md) · [Architecture](docs/ARCHITECTURE.md) · [Experience](docs/EXPERIENCE.md) · [Data sources](docs/DATA_SOURCES.md) · [Data contracts](docs/DATA_CONTRACTS.md) · [References](docs/REFERENCES.md) · [Decisions](docs/DECISIONS.md) · [Verification](docs/VERIFICATION.md) · [Deployment](docs/DEPLOYMENT.md) · [Portfolio](docs/PORTFOLIO.md) · [Earlier future-scope list](docs/FUTURE.md).

The [expanded scope](docs/expanded/README.md) overrides only its expressly promoted items; the other baseline engineering and data guarantees remain in force.

## Inspiration and reuse

[Power Atlas](https://power-atlas.sarvesh-kapre.chatgpt.site/) is the interaction reference. [Jordan's original X link](https://x.com/_cyberhusky/status/2076018638658896085) preserves discovery context. [OpenInfraMap](https://github.com/openinframap/openinframap) is a separate implementation reference, not an identified Power Atlas dependency.

Valkyrie will use original code, branding, copy and stories. Do not import the reference's bundles, imagery or dataset into the product without permission. Upstream libraries and datasets retain their own licenses, attribution and dated coverage. Code licensing and third-party data rights are separate decisions.
