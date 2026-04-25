# Current Focus — luvo-mobile

**Active task:** Add multi-language support to luvo-mobile — Phase 2: wire `useTranslation` into screens.

**Status:** in progress

**Architecture decisions (2026-04-24):**
- `SupportedLanguage = 'es' | 'en' | 'fr' | 'pt' | 'it'` lives ONLY in `src/services/i18n/languages.ts`
- Only `en` and `es` have JSON bundles — `fr`/`pt`/`it` fall back to `es` via i18next `fallbackLng`
- Device language auto-detected on startup via `react-native-localize`; picker overrides it
- Components never call `useTranslation` directly — their component hooks do
- When the user picks a language in the picker, call `i18n.changeLanguage(lang)` from `useLanguagePicker`

**Phase 1 (committed 35bb28d — 2026-04-25):**
- `src/services/i18n/` scaffold fully created
- `locales/en/common.json` + `locales/es/common.json` seeded
- `App.tsx` side-effect import, `declarations/i18next.d.ts` types, `tsconfig.json` resolveJsonModule
- `Settings/constants/languages.ts` deleted; `useLanguagePicker` imports from `services/i18n`

**Phase 2 plan (architect output — 2026-04-25):**
- 2.1 Wire `i18n.changeLanguage` into `useLanguagePicker` — `src/features/Settings/components/LanguagePicker/hooks/useLanguagePicker.ts`
- 2.2 Translate shared overlays: `AuthRequiredScreen`, `MessagesModal` — add `auth.*` + `messages.*` locale keys
- 2.3 Translate Settings screen — add `settings.*` locale keys
- 2.4 Translate Profile + ProfileGuest — add `profile.*` locale keys
- 2.5 Translate Auth screen + form validation — extend `auth.*` locale keys
- 2.6 Translate Account screen, Alerts, provider labels — add `account.*` locale keys
- 2.7 Translate MachineDetails + LaundryDetails (type/status maps, filters) — add `machines.*` + `laundry.*` locale keys
- 2.8 Translate History screen + sub-components; create 3 new hooks — add `history.*` locale keys
- 2.9 Translate Payment flow + refactor strategy progress messages — add `payment.*` locale keys
- 2.10 Translate Report, MyLaundries, both QRScanHandlers; create 2 new hooks — add `report.*` + `myLaundries.*` + `qr.*` locale keys
- 2.11 Translate Info screens, LaundryRegistration, LaundryQR, bottom tabs; create 4 new hooks — add `info.*` + `tabs.*` locale keys
- 2.12 Translate Scan screen + CodeSection; create `useScan` + `useCodeSection` hooks — add `scan.*` locale keys

**Completed steps:**
- 2.1 ✅ `useLanguagePicker` calls `i18n.changeLanguage`
- 2.2 ✅ `AuthRequiredScreen` + `MessagesModal` translated (`auth.*` + `messages.*` keys)
- 2.3 ✅ Settings screen fully translated (`settings.*` keys)
- 2.4 ✅ Profile + ProfileGuest translated; `useProfileHeader` hook extracted (`profile.*` keys)
- 2.5 ✅ Auth screen + form validation translated; `useAuthScreen` hook extracted; `auth.form.*` keys added to both JSON bundles
- 2.6 ✅ Account screen, Alerts, provider labels translated; `account.*` keys added (28 keys); provider labels map moved into hook so it reacts to language changes at runtime
- 2.7 ✅ MachineDetails + LaundryDetails translated; `typeLabels`/`statusLabels` built in hook; `machines.*` + `laundry.*` keys (with interpolation) added to both JSON bundles
- 2.8 ✅ History screen + sub-components translated; `useCycleCard`, `useStatsHeader`, `useHistoryEmptyState` hooks created; `CycleCard` moved to `CycleCard/CycleCard.tsx`; `history.*` keys added (5 keys); `formatDate` locale-awareness deferred
- 2.9 ✅ Payment flow translated; `usePaymentScreen` + `usePaymentMethodCard` hooks created; 30 `payment.*` keys added; `onProgress` strings + `result?.error` deferred (Option B)
- 2.10 ✅ Report, MyLaundries, both QRScanHandlers translated; `useMyLaundryEmptyList` + `useSwipeActions` hooks created; 35 keys added (`report.*`, `myLaundries.*`, `qr.*`); `"Privada"`/`"Principal"` tag labels deferred to 2.11
- 2.11 ✅ Info screens, LaundryRegistration, LaundryQR, bottom tabs translated; 4 new hooks created (`useAboutScreen`, `useFAQScreen`, `useTermsScreen`, `useLaundryRegistrationScreen`, `useLaundryQRScreen`); `myLaundries.item.tags.*` resolved; ~25 keys added; 0 new TS errors
- 2.12 ✅ Scan screen + CodeSection translated; `useScanScreen` + `useCodeSection` hooks created; 5 `scan.*` keys added; 0 remaining hardcoded strings

**Phase 2 COMPLETE. All screens wired. Deferred items for future phases:**
- Payment `onProgress` + `result?.error` strings (strategy internals, needs DI or error registry)
- `formatDate` locale-awareness in `useCycleCard`
- `SwipeActions.tsx` two-exports-per-file violation (pre-existing)

**Next session goal:** Commit all Phase 2 work (steps 2.1–2.12). Then plan Phase 3 — runtime language switching smoke test + any remaining TS errors cleanup.

**Last updated:** 2026-04-25 16:34
