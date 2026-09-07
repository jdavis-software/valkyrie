# Valkyrie — full portfolio target

Planning revision: 2026-09-07 UTC / 2026-09-06 Pacific. **Application not implemented; reference walkthrough incomplete.**

This addendum responds to Jordan's six-domain brief and request for a much more explicit implementation task list. It is an original build specification informed by primary-source research, not recovered Power Atlas source code. The prior 96-task v1 remains the first deliverable; it is not the final extent of the broader portfolio target.

## Scope and precedence

For the full portfolio goal, execute the 96 `VLK-*` foundation tasks plus the 48 `EXP-*` tasks below. Existing v1 specifications still govern unchanged functionality. This addendum overrides only the previous deferral of globe/map switching, broader coverage, cable/IX/license modeling, satellites, large-load/queue semantics, large-catalog delivery and bounded iterative improvement. It does not add SaaS, subscriptions, an LLM runtime, financial recommendations, private infrastructure access or a production operational dependency.

`docs/FUTURE.md` describes deferrals from the smaller v1; the named capabilities above are now planned in this addendum, while its other optional ideas remain optional. VLK-096 is a first-release handoff, not permission to stop the full portfolio goal. Do not silently change a required task to optional to claim completion.

The user supplied the reference URL and reports that its interface lists data sources. That source panel has **not** been extracted here. A provider researched independently must not be labeled as a confirmed Power Atlas input. See [audit protocol](REFERENCE_AUDIT.md), [research findings](RESEARCH.md), and [candidate source register](SOURCE_REGISTER.json).

## Product contract

The first screen remains the atlas, not a marketing landing page. Keep original Valkyrie branding. Provide `Map`, `Globe`, and an explicitly separate `Orbit` mode; six searchable domains; source-aware inspectors; filters; saved/shareable views; and guided stories. Terrestrial selection and filters survive projection changes. Orbit calculations use a visible UTC time and element epoch, never a simulated live telemetry claim.

Cover the world where an approved dataset supports it. The initial detailed packs stay Northern Virginia and Dallas–Fort Worth. Expansion adds explicit coverage declarations for the US, Europe, China and India, using at least one reviewed bounded deep-dive area per non-US region rather than pretending all grid/compute data is complete everywhere. Region boundaries and inclusion rules must be saved in configuration. All regional goals are data-acquisition gates, not assertions that inputs already exist.

The large-catalog target is **200,000 distinct, source-backed catalog entities**, with separate counts by entity kind, source and region. This is a planned target, not a current count. Geometry fragments, aliases, relationship edges, repeated source rows and duplicate cross-provider observations do not count as additional entities. A grid source object is not automatically an entire physical circuit; generating units are not the same thing as power stations. Report the actual achieved scale even if the target remains blocked. Synthetic 500,000-record stress fixtures may test engineering limits but never enter production or portfolio asset counts.

## Release stages

| Stage | Required result |
|---|---|
| R0 — Evidence | Actual reference walkthrough, source-panel inventory and feature-to-task mapping; no failure-only audit pass |
| R1 — Working portfolio slice | Existing VLK roadmap: real world overview, two regional packs, search/details, stories, tests and static build |
| R2 — Six-domain atlas | Expanded sources, broader regional coverage, cables/IX/licenses, orbital mode and map/globe mode |
| R3 — Scale and polish | Measured large-catalog delivery, rich inspectors, dated events, state sharing, accessibility and graceful failures |
| R4 — Full handoff | Verified deployment where permissions allow, genuine demo assets, complete evidence and a bounded next-improvement queue |

A reference-access blocker is not a successful R0. Keep VLK-003 and EXP-001–006 unfinished until their evidence exists, and do not pass dependent design/readiness gates. Continue genuinely independent research and plan-validation work. Do not disable browser restrictions, use private endpoints, fabricate observations, or ask repeatedly for the same unavailable capability.

## Task index

| Epic | Tasks | Detailed cards |
|---|---|---|
| A0 — Reference and source discovery | EXP-001–006 | [Audit tasks](tasks/A0-reference.md) |
| A1 — Provenance and data contracts | EXP-007–012 | [Data foundation](tasks/A1-provenance.md) |
| A2 — Global ground infrastructure | EXP-013–018 | [Ground datasets](tasks/A2-ground.md) |
| A3 — Cables, exchanges and licenses | EXP-019–024 | [Connectivity](tasks/A3-connectivity.md) |
| A4 — Satellite/orbital exploration | EXP-025–030 | [Orbit](tasks/A4-orbit.md) |
| A5 — Globe, delivery and scale | EXP-031–036 | [Rendering](tasks/A5-scale.md) |
| A6 — Integrated product experience | EXP-037–042 | [Experience](tasks/A6-experience.md) |
| A7 — Iteration and portfolio release | EXP-043–048 | [Delivery](tasks/A7-delivery.md) |

Read [implementation contracts](IMPLEMENTATION.md) before these cards. A task card lists dependencies, exact target modules, inputs, behavior, tests, evidence and the condition for completion. Paths are intended implementation locations, not claims that those files exist.

## Execution rules

Start with VLK-001. Run the existing plan checker. Complete the A0 evidence work alongside VLK-003, reconcile observations with the proposed visual contract, then proceed through ready foundation tasks. Later epics can overlap only through explicit task prerequisites; do not serialize entire epics unnecessarily or let multiple agents rewrite shared schemas simultaneously.

Record progress in the canonical task cards and execution log. Each completion entry needs task IDs, commit, commands/results, evidence paths and limitations. Run both `node scripts/check-plan.mjs --self-test` and `node scripts/check-expanded-plan.mjs --self-test`. These validate planning structure only. No duration, uptime, runtime benchmark, published count or successful audit may be invented.

Three bounded improvement cycles are part of the full goal. After the release gates, stop and report the next queue rather than claiming indefinite background work. Additional cycles require a new goal/budget. All publishing uses existing authorized repository/hosting access; no purchases or new accounts.
