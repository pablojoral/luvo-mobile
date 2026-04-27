# Current Focus — luvo-mobile

**Active task:** Design system migration — verify Poppins font renders correctly on all key screens after visual smoke-test.

**Status:** `in_progress` — PR #13 opened with design system tokens. i18n bundles (#9, #11, #12) awaiting review.

---

## Completed (2026-04-27, Session 8: Design System Token Migration + PR #13)

- Poppins fonts (6 TTF weights: Light/Regular/Medium/SemiBold/Bold/ExtraBold) downloaded and linked natively for both iOS (UIAppFonts in Info.plist) and Android (assets/fonts/)
- `react-native.config.js` created for `react-native-asset` linking
- `src/theme/types/Theme.ts` extended: `FontFamilyTheme`, widened `FontWeightTheme` (+ medium/bold/extrabold), `ShadowCardTheme`, `ShadowFloatingTheme`, `ShadowBottomNavTheme`
- `DefaultTheme.ts` + `DarkTheme.ts` updated with Poppins, expanded fontWeight, shadow presets (card, floating, bottom nav)
- `useTextTheme.ts`: hardcoded `'Poppins'` → `theme.fontFamily.poppins`; lineHeight re-enabled (was silently disabled)
- `Text.tsx`: lineHeight prop re-enabled
- `Tag/theme/constants.ts` fontWeightMap: fixed type bug (raw strings → semantic keys)
- 6 shadow theme hooks migrated to differentiated presets
- `border-width-xxs` dead token removed
- `DECISIONS.md`: ADR-006 + ADR-007 appended
- Branch `feat/design-system-tokens` pushed, PR #13 opened: https://github.com/pablojoral/luvo-mobile/pull/13
- Status: awaiting PR review; visual smoke-test pending

---

## Completed (Sessions 7, 2026-04-27: i18n Bundles fr + pt + it)

- `src/services/i18n/locales/fr/common.json` created: 197 keys (full parity with en, es)
- `src/services/i18n/locales/pt/common.json` created: 197 keys (full parity with en, es)
- `src/services/i18n/locales/it/common.json` created: 197 keys (full parity with en, es)
- All three locales registered in `src/services/i18n/resources.ts`
- Branches pushed: `feat/i18n-fr-bundle` (PR #9), `feat/i18n-pt-bundle` (PR #11), `feat/i18n-it-bundle` (PR #12)
- ADR-005 appended to DECISIONS.md: all five locales (es, en, fr, pt, it) now fully translated
- All PRs awaiting review; no test regressions

---

## Architecture decisions in effect

- `SupportedLanguage = 'es' | 'en' | 'fr' | 'pt' | 'it'` lives ONLY in `src/services/i18n/languages.ts`
- **All five locales now have full 197-key JSON bundles** — no fallback required
- Device language auto-detected on startup; picker overrides it
- Component hooks call `useTranslation`; components themselves never do
- **ADR-004:** For service/strategy i18n, return machine-readable codes from service, translate at React boundary (hook)
- **ADR-005:** All five locales fully translated (supersedes ADR-002); `formatDate` and `formatAmount` accept optional Intl format options params
- Formatting utilities (`formatHistoryItem`, etc.) accept locale as explicit parameter; no singleton imports
- **ADR-006 & ADR-007:** Design system adoption and palette import exceptions (Session 8)

---

## Still open / deferred

1. **Visual smoke-test of PR #13** — verify Poppins renders correctly on physical device/simulator post-`pod install` + clean rebuild. (User-only task; critical before merge.)
2. **PR review backlog** — Five open PRs awaiting review:
   - PR #9: `feat/i18n-fr-bundle`
   - PR #10: `test-infra-mocks` (pre-existing framework)
   - PR #11: `feat/i18n-pt-bundle`
   - PR #12: `feat/i18n-it-bundle`
   - PR #13: `feat/design-system-tokens`
3. **Pre-existing test infrastructure gaps** — 4 failing test suites (AsyncStorage mock, react-native-localize mock, Firebase auth mock — unrelated to i18n or design work). Tracked for future test-infra sprint.

---

## Next session goal (concrete executable action)

Run `cd ios && pod install && yarn ios`, then verify Poppins renders correctly on Profile, Laundries, LaundryDetails, Payment, History, Settings, Account, MachineDetails, BottomTab, and ScanFab screens. If Poppins is not rendering (text looks like system font), check `ios/luvomobile/Info.plist` UIAppFonts entries and run `npx react-native-asset` again.

---

**Last updated:** 2026-04-27 15:58
