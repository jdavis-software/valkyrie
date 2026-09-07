# Valkyrie

**Explore the infrastructure behind energy, compute, and connectivity.**

Valkyrie is an independent, map-first portfolio project by Jordan Davis. The intended experience combines a global power-generation overview with deeper regional infrastructure exploration, searchable facilities, evidence-backed details, and shareable guided stories.

> **Status: planning, not a finished application.** This repository is being initialized with an implementation specification and task backlog. No running application, production dataset, benchmark result, or deployment is claimed yet.

## Start here

The implementation plan is organized for a long-running coding-agent goal. Read these documents in order once they are present:

1. [Agent operating rules](AGENTS.md) and [ASTRA goal handoff](GOAL.md).
2. [Product and scope](docs/PRODUCT.md), [architecture](docs/ARCHITECTURE.md), and [experience specification](docs/EXPERIENCE.md).
3. [Data sources and licensing gates](docs/DATA_SOURCES.md), [data contracts](docs/DATA_CONTRACTS.md), and [reference evidence](docs/REFERENCES.md).
4. [Dependency-ordered roadmap](docs/ROADMAP.md), [verification requirements](docs/VERIFICATION.md), and [deployment runbook](docs/DEPLOYMENT.md).
5. [Execution status](docs/execution/STATUS.md) and [portfolio release checklist](docs/PORTFOLIO.md).

## Intended v1

- A distinctive dark atlas interface, with a world overview and two regional deep dives.
- Real, attributed, explicitly dated public data. Historical inventory is never described as live telemetry.
- Global power-plant exploration; regional grid and data-center layers; a small, clearly scoped project/connectivity collection.
- Search, filters, detail inspection, source evidence, comparable metrics, saved views, and guided stories.
- Keyboard and mobile support, an accessible non-map results view, and meaningful offline/error fallbacks.
- A reproducible static deployment, automated checks, and an honest engineering case study.

## Architectural direction

React, TypeScript, Vite, and MapLibre GL JS; a build-time TypeScript ingestion pipeline; versioned static data artifacts; Vitest and Playwright; GitHub Actions and a GitHub Pages-compatible deployment. Exact compatible package versions will be pinned during implementation.

No accounts, paid APIs, application backend, database service, Kubernetes, or runtime AI dependency is required for v1. These are deliberate scope choices for a maintainable portfolio project, not claims about the reference application's stack.

## Inspiration

- [Power Atlas reference experience](https://power-atlas.sarvesh-kapre.chatgpt.site/)
- [Original X link supplied by Jordan](https://x.com/_cyberhusky/status/2076018638658896085)
- [OpenInfraMap](https://openinframap.org/) and its [public source](https://github.com/openinframap/openinframap)

Valkyrie will be original code and branding inspired by the interaction pattern, not a copy of Power Atlas's code, assets, dataset, or unsupported claims. The reference application's internal stack and original repository have not been verified. Its displayed counts are not Valkyrie's targets or data.

## Development

Application setup commands will be added when the foundation tasks are implemented. This planning-only repository does not yet have a runnable app or package lockfile.

## Data and reuse

Each upstream dataset must retain its own attribution, license, retrieval date, and limitations. Publicly viewable data is not automatically approved for redistribution. Original-code licensing and third-party data licensing must remain separate; see the planned source registry before importing data.
