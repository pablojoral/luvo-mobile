# Current focus

**Ticket:** User-directed — build & integrate @luvo/ui shared component package
**Linear:** none
**Branch:** Multiple:
  - `luvo-ui/staging` (new private repo: https://github.com/pablojoral/luvo-ui, PR #1 open)
  - `luvo-mobile/docs/adr-006-010-luvo-ui-architecture` (PR #54 open targeting staging)

**Active task:** Package integration — configure luvo-mobile to consume @luvo/ui

**Attachments:**
  - @luvo/ui package source: `/home/pablitucks/Projects/luvo-ui/`
  - luvo-mobile PR #54: https://github.com/pablojoral/luvo-mobile/pull/54
  - luvo-ui PR #1: https://github.com/pablojoral/luvo-ui/pull/1 (staging → main initial commit)

**Last comment:** Designed and built @luvo/ui as a standalone shared npm package with 6 base components (Text, Button, ActivityIndicator, Separator, TextInput, Switch) in full RN + web split form.

**Status:** in progress

**Blockers:** none

**What was done this session:**
- Designed and built `@luvo/ui` — standalone shared npm package at `/home/pablitucks/Projects/luvo-ui/`
- Extracted `BaseTheme`, design tokens (spacing, colors, typography, radii, shadows), `ThemeProvider`, and `useBaseTheme` hook
- Migrated 6 base components in full platform-split form: `Text`, `Button`, `ActivityIndicator`, `Separator`, `TextInput`, `Switch`
- Each component: headless `hooks/use<Component>.ts` + `<Component>.tsx` (RN) + `<Component>.web.tsx` (web) + per-platform theme hooks + shared `types.ts`
- Web CSS adapter at `src/web/cssAdapter.ts` (`toPx`, `toCssColor`)
- Package exports two entry points: `src/index.ts` (RN/default) and `src/index.web.ts` (explicit web)
- GitHub private repo created: https://github.com/pablojoral/luvo-ui — PR #1 open (staging → main)
- ADR-006 through ADR-010 recorded in `luvo-mobile/DECISIONS.md`; PR #54 open
- Note: Button `iconName` and TextInput eye-toggle icon were not ported (depend on `SvgIcon`/`Icon` still in luvo-mobile)

**Next session goal:**
1. Merge PR #1 at https://github.com/pablojoral/luvo-ui/pull/1 (staging → main initial commit)
2. In `luvo-mobile/package.json`, add `"@luvo/ui": "file:../luvo-ui"` to dependencies
3. In `luvo-mobile/metro.config.js`, add `watchFolders: [path.resolve(__dirname, '../luvo-ui')]` and `resolver.nodeModulesPaths` pointing to `../luvo-ui/node_modules` so Metro resolves the package source
4. Run `yarn install` in luvo-mobile and verify `yarn android` or `yarn ios` still builds clean
5. Convert `luvo-mobile/src/components/Text/Text.tsx` to a one-liner re-export shim: `export { Text } from '@luvo/ui'`

Note: GitHub repo was created under `frankybot07` (the git user), not `pablojoral`. Transfer via GitHub Settings → Danger Zone → Transfer if needed.

**Last updated:** 2026-05-13 23:12

---

## Description

Build and integrate `@luvo/ui` — a shared component library and design system for Luvo React Native (mobile) and the future Luvo admin web app. The package lives at `/home/pablitucks/Projects/luvo-ui/` and is consumed via `file:` link during development.
