# E01 — Application foundation

Goal: a runnable modular application with honest empty/loading states and strict quality tooling.

### VLK-009 — Scaffold and pin the application
Status: todo
Depends on: VLK-006, VLK-008

**Files:** `package.json`, `pnpm-lock.yaml`, `.nvmrc`, `vite.config.ts`, `tsconfig*.json`, `src/main.tsx`.
**Build:** create one React/TypeScript/Vite application using the verified dependency set. Pin Node/pnpm; configure the deployment base deliberately. Separate app and Node tooling TypeScript contexts. Add a minimal `.gitignore` excluding secrets, caches, build and test artifacts.
**Verify:** fresh install with frozen lockfile, dev start and production build/preview succeed at the configured subpath.
**Done when:** another developer can reproduce the shell without changing global tooling.

### VLK-010 — Establish quality commands and basic CI
Status: todo
Depends on: VLK-009

**Files:** ESLint/Vitest configs, `src/test/setup.ts`, `.github/workflows/ci.yml`.
**Build:** add lint, strict typecheck, deterministic unit-test and build commands. Configure React/hooks checks and one meaningful render test. Basic CI runs these without data fetching; full quality gates arrive in E10. Use least-privilege read permissions and no secret-dependent PR checks.
**Verify:** a deliberate type error and a failing test fail local checks/CI; restore them. No broad ignore or pass-with-no-tests escape.
**Done when:** the baseline catches real regressions and commands exit rather than remaining in watch mode.

### VLK-011 — Lay out domain and feature boundaries
Status: todo
Depends on: VLK-009, VLK-007

**Files:** `src/domain/`, `src/features/`, `src/data/`, `scripts/data/`.
**Build:** establish module ownership and typed interfaces without fake service scaffolds. App imports reusable domain logic; domain code imports neither React nor browser/node-only APIs. Ingestion imports domain schemas but cannot leak filesystem/network tools into the browser bundle.
**Verify:** architecture/import checks or tests prevent browser imports of ingestion modules. Strict typecheck covers both environments.
**Done when:** component, data-loading, domain and ingestion concerns are separated and no giant all-purpose module is introduced.

### VLK-012 — Implement design tokens and accessible primitives
Status: todo
Depends on: VLK-005, VLK-009

**Files:** `src/styles/`, `src/components/ui/`.
**Build:** apply the visual contract's tokens, type and spacing. Implement Button, IconButton, Tooltip, Dialog/Sheet, Tabs, Field, Skeleton, EmptyState and ErrorState with consistent variants. Prefer proven accessible behavior for modal focus rather than improvising it.
**Verify:** keyboard/focus tests, disabled-state semantics, touch target checks and contrast samples. No tooltip-only accessible names.
**Done when:** real UI primitives share a cohesive design and the map features will not each reinvent controls.

### VLK-013 — Build the responsive app shell
Status: todo
Depends on: VLK-012

**Files:** `src/app/App.tsx`, shell/header/rail components.
**Build:** implement brand/header, region control, category rail, reserved map host, results/inspector slots and Sources/About entry points. Keep slots honest: loading/empty states, not fake content or numbers. Use real accessible buttons and composition-sized App code.
**Verify:** inspect 1440×900 and 390×844. No overflow, hidden navigation or layout shift when panels open.
**Done when:** the shell expresses the intended product and all visible controls either work or are explicitly disabled pending data.

### VLK-014 — Create explicit UI state and actions
Status: todo
Depends on: VLK-011, VLK-013

**Files:** feature stores/actions/selectors and `src/domain/query.ts`.
**Build:** define catalog, exploration, panel, selection, compare and story state boundaries. Use typed actions, stable selectors and pure filter predicates. Keep continuous map camera motion out of React renders. Decide URL synchronization ownership now, implement codec in E07.
**Verify:** state-transition tests cover clear filters, region changes, selection removal and simultaneous panel actions.
**Done when:** state has one owner per concern and impossible combinations are handled explicitly.

### VLK-015 — Add error and loading boundaries
Status: todo
Depends on: VLK-013

**Files:** app/feature error boundaries and loading primitives.
**Build:** separate application, data, worker and map failure surfaces. Include retry/back/results paths, abort-aware asynchronous handling and readable pending states. Keep initial HTML meaningful even before map loading.
**Verify:** injected component and fetch failures produce recoverable UI without blank screens; errors are visible in logs but not shown as raw stack traces to users.
**Done when:** a failed map or shard cannot destroy the whole interface.

### VLK-016 — Document the developer contract
Status: todo
Depends on: VLK-010, VLK-011, VLK-014, VLK-015

**Files:** README development section, `docs/ARCHITECTURE.md`, original-code license decision/notice.
**Build:** document actual install/dev/build/test commands, environment requirements, folder boundaries and expected not-yet-implemented features. Implement only commands that exist; future data commands may remain clearly labeled requirements until E02. Record original-code MIT decision separately from data licenses.
**Verify:** follow setup from a clean temporary checkout; check actual output and absence of credentials. Planning checker still passes.
**Done when:** the repository is genuinely runnable and does not overstate its partial foundation.
