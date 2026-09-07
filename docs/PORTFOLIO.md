# Portfolio packaging and release checklist

## Positioning

Valkyrie should demonstrate Jordan's ability to build a polished interactive product while handling real-world data carefully. The strongest technical narrative is: **a responsive map application, a reproducible data pipeline, explicit provenance, sensible performance tradeoffs and verified user journeys**. It is not necessary to claim a commercial deployment, live grid telemetry or enterprise-scale adoption.

The future README opening should say what the app does, link the verified live demo and show a genuine screenshot. Explain historical/global versus regional/editorial coverage immediately below—not hidden in a disclaimer at the bottom.

## Required repository deliverables

| Deliverable | Required contents |
|---|---|
| README | Actual demo link if verified, real screenshot, implemented capabilities, stack, setup, source/coverage caveats, architecture pointer, inspiration and license separation |
| Architecture case study | Problem, choices, source normalization, contracts, map lifecycle, worker/search, test strategy, measured bottlenecks/fixes and tradeoffs |
| Data methodology | Provider list, pinned versions, terms, transformations, identity/merge decisions, unknown values, precision and release limitations |
| Screenshots | World, regional evidence inspector, guided story and mobile; genuine app/data state |
| Demo script | 60–90 seconds, exact working subjects/actions and a traceable evidence moment |
| Release report | Actual commit/data version, real record counts, tested profiles, CI/browser/a11y/performance evidence, open limitations and deployment result |
| Changelog | Implemented changes only, not unchecked roadmap claims |
| Future work | Clear separate backlog so unfinished optional ideas are not presented as shipped |

## Suggested demonstration script structure

0–10 seconds: open the app, explain energy/compute/connectivity and explicitly identify published data snapshots.

10–30 seconds: run a real search, change a meaningful filter and inspect an asset. Show source/date/units rather than an unexplained impressive number.

30–50 seconds: enter a regional pack, select a compute facility and inspect publicly mapped grid context. Say that nearby geometry is not a verified supply connection.

50–70 seconds: step through a story or compare compatible records, then copy a view URL and open it in a fresh context.

70–90 seconds: show responsive layout and summarize one real engineering decision, such as static partitioned data, worker search or provenance validation. Final content/timing should be rehearsed, not represented as recorded video when only a script exists.

## Screenshot standards

Capture real rendered product states after QA. Show readable text, complete controls, attribution and appropriate data warnings. Avoid private browser tabs, account details, raw error stacks and local filesystem paths. Use concise factual captions and a build/data-version note. Do not present image-generated mockups as screenshots of working software.

Commit a small, optimized media set. Large traces and videos can be attached to releases only when supported and authorized. No system/container font files should be copied into the repository as part of portfolio assets.

## Claims checklist

Do not claim 'live', 'real-time', 'complete global coverage', 'production-grade', a specific user count, a performance number, an accuracy percentage, or an object count unless evidence supports the precise claim. A synthetic stress-test size is not the real dataset size. 'AI-assisted implementation' is acceptable when accurate; do not invent tool usage, model versions, coding hours or an autonomous runtime history.

Credit Power Atlas as inspiration and the actual upstream libraries/datasets as applicable. Do not imply affiliation with OpenAI, the reference author, infrastructure owners or data publishers. Original code and upstream data licensing must remain visibly distinct.

## Release acceptance

Required: all 96 v1 task gates genuinely complete, including actual public deployment verification or explicitly reported incomplete publication status; no known material data/interaction/accessibility defects; reproducible clean-clone build; three working stories; source audit; real screenshots; README/case study/demo script/release evidence; and no secret/private data leakage.

Optional: a genuine demo video, social preview artwork, or a release tag when tools allow. Their absence must be stated accurately and does not justify inventing assets. Optional technical features in FUTURE do not block a scoped v1.
