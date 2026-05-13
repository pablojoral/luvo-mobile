# Current focus

**Ticket:** User-directed — build & integrate @luvo/ui shared component package
**Linear:** none
**Branch:** `docs/adr-006-010-luvo-ui-architecture` (PR #54)

**Active task:** Complete — luvo-mobile fully migrated to @luvo/ui

**Attachments:**
- luvo-ui PR #2: https://github.com/pablojoral/luvo-ui/pull/2
- luvo-mobile PR #54: https://github.com/pablojoral/luvo-mobile/pull/54

**Status:** in review

**Blockers:** none

**What was done this session:**
- Ported `LaundryMapMarker` and `MachineCard` into luvo-ui with full RN + web stubs
- Removed `LoadErrorState` from luvo-ui (user-explicit exclusion)
- Ported full theme into luvo-ui: `DefaultTheme`, `DarkTheme`, `useTheme` (primary hook with `MobileThemeExtras`), web variant returns 0 for safe-area insets
- Added `react-native-safe-area-context` and `@rnmapbox/maps` as optional peer deps in luvo-ui
- Deleted ALL local component implementations from luvo-mobile `src/components/` (kept `WsStatusIndicator` and `LoadErrorState`)
- Removed local theme layer (`themes/`, `types/`, `constants/`); `useTheme.ts` is now a one-line shim to `@luvo/ui`
- Updated all import paths across luvo-mobile `src/` to `@luvo/ui`
- Fixed call sites: `AuthRequiredScreen`, `AvailabilityTag`, `ConcurrencyTag`, `MachineCard`, `ErrorBoundary` required props
- Added `toAvailabilityStatus` utility (`src/utils/Laundry/toAvailabilityStatus.ts`)
- Extracted `useAppContentStrings` from `App.tsx` (component rule 10)
- Updated Jest mock: `ErrorBoundary` stub added, `Colors` mock corrected to flat palette shape
- Fixed nav `fonts` mock and circular `jest.requireMock` in `MachineList.test.tsx`
- All 102 tests pass; typecheck + lint clean on both repos

**Next session goal:**
After luvo-ui PR #2 merges into staging, run `cd /home/pablitucks/Projects/luvo-mobile && yarn add @luvo/ui@pablojoral/luvo-ui#<merge-commit-sha>` to repin to the merge SHA, update `yarn.lock`, and push to PR #54.

**Last updated:** 2026-05-14 01:01

---

## Description

Build and integrate `@luvo/ui` — a shared component library and design system for Luvo React Native (mobile) and the future Luvo admin web app. The package lives at `/home/pablitucks/Projects/luvo-ui/` and is consumed via GitHub SHA pin during development.
