# E10 — CI, refresh and deployment

Goal: clean-clone reproducibility, least-privilege delivery and a remotely verified demonstration URL.

### VLK-081 — Make CI reproducible and least-privilege
Status: todo
Depends on: VLK-016, VLK-073

**Files:** `.github/workflows/ci.yml`, lockfile/runtime configuration.
**Build:** pin action references deliberately, match Node/pnpm versions, install frozen dependencies and use committed approved data. Run plan validation, lint/typecheck/tests/data validation/build. Use read-only permissions for checks and no production secrets in untrusted PR jobs.
**Verify:** an actual CI run reports the expected commands/results and can run without live provider data. Cache keys include the lockfile, not arbitrary branch state.
**Done when:** CI reproduces local quality checks without unnecessary write/admin access.

### VLK-082 — Add browser, accessibility and budget gates
Status: todo
Depends on: VLK-081, VLK-074, VLK-075, VLK-076, VLK-077, VLK-078

**Files:** CI jobs and artifact retention configuration.
**Build:** run production-preview browser tests, automated accessibility checks and deterministic size gates. Upload failing traces/screenshots with bounded retention. Keep expensive external freshness checks outside pull-request builds.
**Verify:** a failing browser assertion blocks the gate and produces useful evidence; flaky retries do not silently certify a persistent defect.
**Done when:** a green pipeline means the real critical user journeys and data checks ran.

### VLK-083 — Add reviewable manual data refresh
Status: todo
Depends on: VLK-024, VLK-032, VLK-081

**Files:** refresh script/workflow, data diff report and runbook.
**Build:** provide explicit/manual refresh for approved refreshable sources, preserving fixed historical sources. Generate old/new counts, changed facts/geometries, notices, warnings and checksums; require review before pointer change. Do not enable automatic frequent provider polling by default.
**Verify:** failed refresh retains last-known-good data; a suspicious empty/large-change release is blocked for review. Tests remain offline.
**Done when:** future maintenance is reproducible without quietly rewriting facts or overloading public services.

### VLK-084 — Prepare static deployment artifact
Status: todo
Depends on: VLK-082, VLK-080

**Files:** Vite base configuration, `.github/workflows/deploy.yml`, deployment docs.
**Build:** build the exact candidate for `/valkyrie/`; include worker/data/geography paths, notices and static metadata. Scope Pages/id-token permissions to deploy job only. No purchases, new accounts or repository-wide permission changes.
**Verify:** serve the artifact locally at the nested path and test direct query links, lazy chunks, workers, source links and 404 behavior.
**Done when:** the deployable artifact is proven independently of the development server.

### VLK-085 — Publish through available repository permissions
Status: todo
Depends on: VLK-084

**Files:** deployment workflow evidence and `docs/execution/STATUS.md`.
**Build:** use the owner's existing authorized GitHub hosting path. Configure/trigger only actions available to the current tools. If Pages enablement or environment approval is unavailable, record the exact owner-only step and leave publication blocked; do not invent a deployed URL.
**Verify:** a real workflow/deployment result confirms upload and target URL, not merely an artifact build. Preserve prior deployments where applicable.
**Done when:** hosting publication is confirmed; otherwise this task remains explicitly blocked while independent documentation proceeds.

### VLK-086 — Verify the actual public URL
Status: todo
Depends on: VLK-085

**Files:** post-deploy smoke evidence and deployment report.
**Build:** open the actual URL in a fresh browser; run world load, search/inspect, one regional pack, a story and a copied query link. Check workers, data manifests, notices, console errors and mobile layout from the remote host.
**Verify:** live responses correspond to the intended commit/data release. A 200 HTML shell without a functioning map is not a pass.
**Done when:** the public demonstration is genuinely working and may be linked as live in README.

### VLK-087 — Document maintenance and rollback
Status: todo
Depends on: VLK-083, VLK-086

**Files:** `docs/DEPLOYMENT.md`, source refresh and recovery procedures.
**Build:** document rollback to prior application/data artifacts, source failure handling, update cadence, offline build behavior and account-only operations. Keep app and dataset versions paired; no unreviewed destructive rollback command.
**Verify:** rehearse local rollback or inspect an explicit dry-run with the correct artifact IDs. Confirm instructions do not expose tokens or promise live feeds.
**Done when:** another developer can maintain the demo without rediscovering its operational assumptions.

### VLK-088 — Pass delivery gate
Status: todo
Depends on: VLK-087, VLK-080

**Files:** deployment evidence, CI links and execution status.
**Build:** reconcile local candidate SHA, CI SHA, published SHA and data release. Document any difference and rerun affected checks. Separate build readiness from live publication in the status summary.
**Verify:** all delivery evidence resolves and the published application matches the verified candidate; required blockers remain visible.
**Done when:** M4's delivery component is complete with a confirmed reproducible URL.
