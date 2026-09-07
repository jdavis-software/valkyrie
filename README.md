# Valkyrie

**Explore the infrastructure behind energy, compute, and connectivity.**

Valkyrie is an independent, map-first portfolio project by Jordan Davis. The planned experience combines a global power-generation overview with deeper regional infrastructure exploration, searchable facilities, evidence-backed details and shareable guided stories.

> **Status: implementation plan ready; application not built yet.** This repository contains a detailed specification, 96 dependency-ordered task cards, 12 GitHub epic issues, an ASTRA goal handoff and a working plan-validation workflow. It does not yet contain a running application, imported production data, runtime benchmarks or a deployed demo.

## Start here

| Entry point | Purpose |
|---|---|
| [GOAL.md](GOAL.md) | Complete implementation prompt for the coding agent |
| [AGENTS.md](AGENTS.md) | Operating rules, quality bar, progress recovery and boundaries |
| [Roadmap](docs/ROADMAP.md) | 12 epics and 96 tasks with dependencies and acceptance criteria |
| [GitHub epic index](docs/execution/ISSUES.md) | Issues #1–#12, each with eight implementation checklist items |
| [Execution status](docs/execution/STATUS.md) | Current state and exact next task |
| [Plan-validation evidence](docs/qa/plan-validation.md) | Actual CI evidence; distinct from future application QA |

### Launch instruction

Open this repository in the coding environment and use its goal workflow with:

```text
Implement Valkyrie v1 end to end. Read AGENTS.md and GOAL.md first,
recover docs/execution/STATUS.md, and execute all 96 required tasks in
docs/ROADMAP.md in dependency order. Build and verify the actual app;
do not stop at another plan or a mock dashboard. Follow the data,
visual, testing, deployment and portfolio release gates. Record
progress and blockers honestly. Start with VLK-001 if no implementation
has begun.
```

## Planned v1

An original dark atlas interface; real historical global power-plant data; Northern Virginia and Dallas–Fort Worth grid/compute deep dives; a small source-backed project/connectivity collection; keyboard search, filters, results and a source-aware inspector; compatible asset comparison; three guided stories; shareable URLs and local saved views; responsive and no-WebGL fallbacks; reproducible static delivery; and an honest portfolio case study.

Global inventory, regional extracts and editorial samples have visibly different coverage. Historical data is never called live. Nearby infrastructure is never described as verified power supply. Record counts come from validated assets, not geometry fragments or fictional demonstration data.

## Specification shelf

[Product](docs/PRODUCT.md) · [Architecture](docs/ARCHITECTURE.md) · [Experience](docs/EXPERIENCE.md) · [Data sources](docs/DATA_SOURCES.md) · [Data contracts](docs/DATA_CONTRACTS.md) · [Reference evidence](docs/REFERENCES.md) · [Decisions](docs/DECISIONS.md) · [Verification](docs/VERIFICATION.md) · [Deployment](docs/DEPLOYMENT.md) · [Portfolio](docs/PORTFOLIO.md) · [Future scope](docs/FUTURE.md).

## Architectural direction

React, TypeScript, Vite and MapLibre GL JS; a build-time TypeScript ingestion pipeline; versioned static data artifacts; worker-backed search; Vitest and Playwright; GitHub Actions and a GitHub Pages-compatible deployment. Exact compatible package versions are pinned during implementation, not guessed in the plan.

No accounts, paid APIs, application backend, database service, Kubernetes or runtime AI dependency is required for v1. This is a deliberate portfolio design choice, not a claim about the reference application's stack.

## Validate the plan now

With Node 18 or later, no application dependency installation is needed:

```bash
node scripts/check-plan.mjs --self-test
```

The checker validates the 96-task graph, status vocabulary, required task sections and relative document/file links. It tests its own failure detection and runs through [GitHub Actions](https://github.com/jdavis-software/valkyrie/actions/workflows/plan-check.yml). It does **not** certify the future application's correctness, external URLs or data rights.

Application install/dev/build commands will be added by the foundation tasks. There is no app package lockfile yet.

## Inspiration and data reuse

- [Power Atlas reference experience](https://power-atlas.sarvesh-kapre.chatgpt.site/)
- [Original X link supplied by Jordan](https://x.com/_cyberhusky/status/2076018638658896085)
- [OpenInfraMap public source](https://github.com/openinframap/openinframap)

Valkyrie will use original code, branding and copy inspired by the interaction pattern—not Power Atlas's bundles, assets or dataset. The reference's internal stack and original repository have not been verified.

Each upstream dataset retains its own attribution, license, retrieval/source dates and limitations. Public visibility does not automatically permit redistribution. Original-code licensing and third-party data licensing remain separate; review the source registry before importing or publishing data.
