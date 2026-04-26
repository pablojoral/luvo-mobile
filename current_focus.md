# Current Focus — luvo-mobile

**Active task:** None — i18n Phase 2 shipped. Next task: SwipeActions cleanup PR.

**Status:** idle

---

## Completed (2026-04-25–2026-04-26)

**i18n Phase 2 shipped:**
- All screens and component hooks now call `useTranslation('common')` from i18next
- `en/common.json` + `es/common.json` fully populated; 0 remaining hardcoded UI strings
- Runtime language switching wired end-to-end via `useLanguagePicker`
- Smoke-tested in both `es` and `en` locales — all screens re-render correctly, no missing-key fallbacks
- ADRs recorded in `DECISIONS.md` (ADR-001, ADR-002, ADR-003)
- Committed with code review clean

## Architecture decisions in effect

- `SupportedLanguage = 'es' | 'en' | 'fr' | 'pt' | 'it'` lives ONLY in `src/services/i18n/languages.ts`
- Only `en` and `es` have JSON bundles — `fr`/`pt`/`it` fall back to `es` via i18next `fallbackLng`
- Device language auto-detected on startup via `react-native-localize`; picker overrides it
- Component hooks call `useTranslation`; components themselves never do

## Deferred follow-up (Phase 3 — not blockers)

1. **Payment strategy i18n** — `onProgress` strings and `result?.error` codes. Approach: return machine-readable error codes from strategy, translate at hook boundary (per ADR-003).
2. **`formatDate` locale-awareness in `useCycleCard`** — switch to `Intl.DateTimeFormat(i18n.language, ...)`.
3. **`fr` / `pt` / `it` translation bundles** — purely additive; gate on product confirming locale priority.
4. **(Optional) Static-typed status keys in `useAvailabilityTag`** — replace dynamic `` t(`machines.status.${status}`) `` with `Record<MachineStatus, string>` lookup map for full type safety.

---

## Next session goal (concrete first action)

Open `src/features/MyLaundries/components/MyLaundryItem/components/SwipeActions/SwipeActions.tsx`, split `QRSwipeAction` into `QRSwipeAction/QRSwipeAction.tsx` and `RemoveSwipeAction` into `RemoveSwipeAction/RemoveSwipeAction.tsx` (per components.md rule #1), update all import sites, run `yarn lint && yarn typecheck`, then hand to commit-agent on a new branch.

**Last updated:** 2026-04-26 13:46
