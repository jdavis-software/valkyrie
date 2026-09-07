# Deployment and maintenance runbook

This is a target runbook. No deployment exists in the planning commit. Resolve current action versions/account settings during implementation; do not copy unverified tokens, guessed action SHAs or placeholder secrets into workflows.

## 1. Static target

Repository: `jdavis-software/valkyrie`. Intended default project-site base: `/valkyrie/`. The anticipated GitHub Pages address is `https://jdavis-software.github.io/valkyrie/`, but it must not appear as a working live demo link until publication and remote smoke tests confirm it.

Use the owner's existing GitHub repository/Pages authorization. No new account, purchased domain, paid hosting or backend is required. A different existing static host is a later owner choice, not a reason to change the application architecture.

Primary references to verify at implementation: https://vite.dev/guide/static-deploy.html and https://docs.github.com/en/pages/getting-started-with-github-pages .

## 2. Build requirements

Vite base must be configured explicitly. Resolve all public data, geography, workers, icons and lazy chunks against that base; do not hardcode `/data/...`. Use a single document route with query-encoded state, so a shared view does not depend on a server rewrite for a nested React route.

`pnpm build` reads committed approved release artifacts. It must not fetch fresh providers or require a map/API key. Build metadata should identify commit and data release without exposing personal environment paths. Check the built file inventory, source notices and secret scan before upload.

## 3. CI versus deployment permissions

Validation workflow: read-only contents; checkout, pinned runtime/package manager, frozen install, plan/lint/type/test/data/build checks and browser verification. Pull requests from untrusted forks must not access deployment secrets or write permissions. Avoid `pull_request_target` execution of untrusted code.

Deployment workflow: use verified current official GitHub Pages actions and pin resolved SHAs with human-readable version comments. Scope `pages: write` and `id-token: write` to the deployment job, keeping read-only permissions elsewhere. Use an explicit Pages environment and deployment concurrency. Do not grant repository administration or broadly increase token permissions to work around a missing action.

Do not fabricate a successful Actions run. If creating/enabling a Pages site or environment approval is not exposed by the current connection, record that exact owner-only operation; complete the build/workflow/tests and keep publication blocked.

## 4. Local preflight

After the command contract is implemented:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm check:budgets
pnpm test:e2e
pnpm preview
```

Open the documented preview URL including `/valkyrie/` when configured. Verify manifest, workers, lazy chunks and a fresh-context query link. A `vite dev` success is not enough. Confirm a production record source warning appears and no fixture namespace exists in the published artifacts.

## 5. Publication and verification

Publish only the checked commit/data pair. Confirm actual workflow status, deployment URL and artifact provenance. In a fresh browser test: initial world load, exact-ID search, inspector evidence, both regional pack loading, one guided story, copied URL in another context and mobile navigation. Inspect real network/console errors.

Record remote response/cache behavior and test worker imports from the deployed origin. The application should tolerate an old HTML file plus new data pointer by using explicit release IDs, but stale incompatible assets must trigger a recoverable version error rather than silent corruption.

If a public deployment is unavailable, the final report says `Application verified locally; public deployment blocked by <exact step>`. Do not replace this with an untested anticipated URL.

## 6. Dataset refresh

Default is manual refresh, not a cron job. Historical WRI data remains pinned unless a deliberate new source/version decision is made. For eligible OSM/curated updates: fetch conservatively, cache, validate terms and source changes, normalize, compare old/new, review quality and coverage, and only then publish a new immutable release and update the pointer.

Source date, retrieval date and build time are separate. A scheduled successful fetch cannot make historical data current. Keep failed refresh reports and last-known-good artifacts. Do not run external data ingestion in every PR or on browser panning.

## 7. Rollback

Preserve the previous application artifact/commit and compatible data release. Revert the smallest reviewed application/data-pointer change or redeploy a known good pair through normal history; do not force-push or erase releases. Validate checksums and run the remote smoke test again. Record the rollback reason and affected versions.

A missing data partition should not cause a rollback to a synthetic dataset. If no valid data is available, show the explicit failure state and retain the last trustworthy release if possible.

## 8. Maintainer checklist

Document Node/pnpm/browser versions; valid clone/build commands; source registry and refresh method; actual current data coverage; deployment/environment location; workflow permissions; source and code license distinctions; rollback path; and known unsupported browsers/features. No secrets or private contact details in the runbook.
