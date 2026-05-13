# Current focus

**Ticket:** User-directed — build & integrate @luvo/ui shared component package
**Linear:** none
**Branch:** `docs/adr-006-010-luvo-ui-architecture` (PR #54)

**Status:** Phase 2 complete — typecheck and lint both pass clean. Ready to push.

**Blockers:** none

**What was done this session (Phase 2 continuation):**
- Pinned @luvo/ui to SHA `pablojoral/luvo-ui#b56413313b8c498b29399b8359e795b3ac0711d7`
- Deleted all 33 local component folders now covered by @luvo/ui (kept WsStatusIndicator, LoadErrorState)
- Replaced `src/theme/hooks/useTheme.ts` with a re-export shim; removed orphaned `themes/`, `types/`, `constants/` dirs
- Rewrote all local-path imports to `@luvo/ui` across ~55 files
- Updated Jest mock to stub all newly-imported components
- Fixed all breaking API changes from new @luvo/ui SHA:
  - `AvailabilityTag`: added `labels` prop; added `toAvailabilityStatus()` utility to map `MachineStatus` (underscores) → `AvailabilityStatus` (hyphens)
  - `ConcurrencyTag`: added `labels` prop wired through `useLabelsStrings`
  - `MachineCard`: added `labels.availability` wired through `useMachinesListStrings`
  - `AuthRequiredScreen`: added `defaultSubtitle`, `title`, `signInLabel`, `onSignIn` to MyLaundries and Profile
  - `ErrorBoundary`: added `title`, `body`, `retryLabel` props in `App.tsx` via `useTranslation`
- `yarn typecheck`: ✅ 0 errors
- `yarn lint`: ✅ 0 errors

**Attachments:**
  - @luvo/ui package source: `/home/pablitucks/Projects/luvo-ui/`
  - luvo-mobile PR #54: https://github.com/pablojoral/luvo-mobile/pull/54
  - luvo-ui PR #2: https://github.com/pablojoral/luvo-ui/pull/2

**Next session goal:**
Push the current branch to update PR #54. After luvo-ui PR #2 merges, repin `@luvo/ui` in `package.json` to the merge-commit SHA and push again.

**Last updated:** 2026-05-14

---

## Description

Build and integrate `@luvo/ui` — a shared component library and design system for Luvo React Native (mobile) and the future Luvo admin web app. The package lives at `/home/pablitucks/Projects/luvo-ui/` and is consumed via GitHub SHA pin during development.
