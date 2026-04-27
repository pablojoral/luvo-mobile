# Current Focus — luvo-mobile

**Active task:** Visual smoke-test of PR #13 (design-system-tokens) — verify Poppins font renders correctly on all key screens. User-only task; blocked on physical device/simulator.

**Status:** `in_progress` — all code work complete. 6 open PRs awaiting review/merge.

---

## Completed (Session 10, 2026-04-27: pt-BR Translation Blockers Fixed)

- Fixed 3 translation blockers in `src/services/i18n/locales/pt/common.json`
- `"reporte"` → `"relatório"` in `report.submit`, `report.submitError`, `report.entitySection.label`
- Commit `98b5e3d` pushed to `feat/i18n-pt-bundle`; PR #11 updated — all blockers resolved

---

## Completed (Session 9, 2026-04-27: Code Reviews Posted for All Open PRs)

- Code reviews posted for all 6 open PRs (#9–#14)
- PR #10 confirmed to cover all 4 pre-existing test infrastructure gaps (AsyncStorage, react-native-localize, Firebase auth); 7 suites / 51 tests green
- PR #11 (pt-BR): 3 translation blockers identified → fixed in Session 10
- PR #12 (it): no blockers; 2 minor suggestions (about title wording, mp_deeplink_timeout)
- PR #9 (fr): no blockers; minor wording concern in settings.promotions.description

---

## Completed (Session 8, 2026-04-27: Design System Token Migration + PR #13)

- Poppins fonts (6 TTF weights) linked natively: iOS UIAppFonts in Info.plist + Android assets/fonts/
- `react-native.config.js` created; `react-native-asset` run
- `src/theme/types/Theme.ts`: FontFamilyTheme, widened FontWeightTheme (+medium/bold/extrabold), ShadowCardTheme, ShadowFloatingTheme, ShadowBottomNavTheme; fontWeight value union tightened
- `DefaultTheme.ts` + `DarkTheme.ts`: fontFamily.poppins, shadowCard (elev 4), shadowFloating (elev 8), shadowBottomNav (directional elev 4)
- `useTextTheme.ts`: hardcoded `'Poppins'` → `theme.fontFamily.poppins`; lineHeight re-enabled (was silently disabled)
- `Text.tsx`: lineHeight prop re-enabled and threaded through
- `Tag/theme/constants.ts`: fontWeightMap type bug fixed (raw strings → semantic keys)
- 6 shadow theme hooks migrated to differentiated presets
- `border-width-xxs` dead token removed
- `DECISIONS.md`: ADR-006 + ADR-007 appended
- Branch `feat/design-system-tokens` pushed, PR #13 opened: https://github.com/pablojoral/luvo-mobile/pull/13

---

## Completed (Sessions 6–7, 2026-04-27: i18n Bundles fr + pt + it)

- `src/services/i18n/locales/fr/common.json`: 197 keys, full parity with en/es → PR #9
- `src/services/i18n/locales/pt/common.json`: 197 keys, full parity with en/es → PR #11
- `src/services/i18n/locales/it/common.json`: 197 keys, full parity with en/es → PR #12
- All three locales registered in `src/services/i18n/resources.ts`
- ADR-005: all five locales (es/en/fr/pt/it) fully translated; no runtime fallback

---

## Completed (Sessions 1–5, 2026-04-26: formatHistoryItem refactor + SwipeActions + PR #6/#8)

- PR #6 merged: SwipeActions split, theme hooks extracted, i18n hook boundary (Phases 1–3)
- PR #8 merged: formatHistoryItem made pure (locale param), formatDate + formatAmount extended with Intl options

---

## Architecture decisions in effect

- `SupportedLanguage = 'es' | 'en' | 'fr' | 'pt' | 'it'` lives ONLY in `src/services/i18n/languages.ts`
- **All five locales have full 197-key JSON bundles** — no runtime fallback needed
- Device language auto-detected on startup; picker overrides it
- Component hooks call `useTranslation`; components themselves never do
- **ADR-004:** service/strategy i18n: return machine-readable codes, translate at React hook boundary
- **ADR-005:** all five locales fully translated; `formatDate`/`formatAmount` accept optional Intl options params
- **ADR-006:** Luvo design system adopted as token source of truth; Poppins natively linked; three shadow tiers (shadowBox/shadowCard/shadowFloating)
- **ADR-007:** direct `Colors` palette imports allowed only for non-semantic ramps (status indicator, cartographic heatmap)

---

## Still open / deferred

1. **Visual smoke-test of PR #13** — user-only; requires `pod install` + clean iOS/Android rebuild. Critical before merge.
2. **PR review backlog** — all open, all mergeable, none reviewed:
   - PR #9 `feat/i18n-fr-bundle` — clear
   - PR #10 `chore/test-infra-mocks` — clear (covers 4 pre-existing test failures)
   - PR #11 `feat/i18n-pt-bundle` — clear (blockers fixed in Session 10)
   - PR #12 `feat/i18n-it-bundle` — clear (2 minor suggestions)
   - PR #13 `feat/design-system-tokens` — clear (user smoke-test pending)
   - PR #14 `chore/focus-cleanup` — docs only

---

## Next session goal (concrete executable action)

Run `cd ios && pod install && yarn ios`, then verify Poppins renders correctly on Profile, Laundries, LaundryDetails, Payment, History, Settings, Account, MachineDetails, BottomTab, and ScanFab screens. If text looks like system font (not Poppins), check `ios/luvomobile/Info.plist` UIAppFonts entries and run `npx react-native-asset` again.

---

**Last updated:** 2026-04-27 HH:MM
