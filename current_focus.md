# Current Focus — luvo-mobile

**Active task:** Next session — refactor Phase 4: number formatting with explicit locale and currency params.

**Status:** PR #8 merged. Design confirmed Option B (restore year to CycleCard). Phase 3 complete; Phase 4 queued.

---

## Completed (2026-04-26, Session 4: Design Confirmation + CycleCard Date Format)

**Design confirmation received:**
- Option B confirmed: restore year to CycleCard dates
- `formatDate` extended with optional `options: Intl.DateTimeFormatOptions` param (backward-compatible)
- `useCycleCard.ts` updated to pass `{ day: '2-digit', month: 'short', year: 'numeric' }`
- All 16 unit tests in `src/utils/History/__tests__/formatHistoryItem.test.ts` pass (13 existing + 3 new)

**Commit 46973d0 pushed:**
- Branch: `refactor/format-history-item-locale-param`
- PR #8 updated with design confirmation + tests

**PR #8 status:**
- Unblocked — ready to merge
- All design gates cleared
- Code review previously passed

---

## Completed (2026-04-26, Session 3: formatHistoryItem Locale Extraction)

**Branch created:**
- `refactor/format-history-item-locale-param` branched from updated `master` (after PR #6 merged)

**formatHistoryItem.ts refactored to pure module:**
- Removed i18n singleton import from the module
- Added `locale?: string` param to `formatAmount(amount, currency, locale?)`
- Added `locale?: string` param to `formatDate(date, locale?)`
- All locale resolution moved to call sites (component hooks)
- File is now pure: no side effects, no singleton dependencies
- Module is testable without i18n mocking

**Call sites updated:**
- `useCycleCard.ts`: passes `i18n.language` explicitly to `formatDate()`
- `useStatsHeader.ts`: passes `i18n.language` explicitly to `formatAmount()`

**Unit tests added:**
- New file: `src/utils/History/__tests__/formatHistoryItem.test.ts`
- 13 test cases: pure function tests, no i18n mocking, no singletons
- All tests passing

---

## Completed (2026-04-26, Session 2: Rebase + Code Review)

**Rebase & merge conflict resolution (2026-04-26 19:30–19:55):**
- `origin/master` had moved to `3fac8a9` (hook file renames: `.ts` → `.tsx`)
- Rebased `refactor/swipe-actions-split` onto `origin/master`: all 7 commits replayed cleanly, no manual conflict fixes needed
- Force-pushed with `--force-with-lease`: branch now at `f2fcb74`
- PR #6 status: `mergeable: MERGEABLE`, `state: OPEN`

**Code review completed:**
- No blocking issues found
- One minor suggestion: comment on template-literal cast in `usePaymentScreen.ts:47`
- Review passed

**PR #6 merged to master (2026-04-26 ~20:00):**
- Title: `refactor(swipe-actions): split QRSwipeAction + RemoveSwipeAction, extract theme hooks; i18n hook boundary (Phase 1–3)`
- 7 commits: 2 SwipeActions refactor + 5 i18n Phase 1–3

---

## Architecture decisions in effect

- `SupportedLanguage = 'es' | 'en' | 'fr' | 'pt' | 'it'` lives ONLY in `src/services/i18n/languages.ts`
- Only `en` and `es` have JSON bundles — `fr`/`pt`/`it` fall back to `es` via i18next `fallbackLng`
- Device language auto-detected on startup; picker overrides it
- Component hooks call `useTranslation`; components themselves never do
- ADR-004: For service/strategy i18n, return machine-readable codes from service, translate at React boundary (hook)
- Formatting utilities (`formatHistoryItem`, etc.) accept locale as explicit parameter; no singleton imports
- **ADR-005:** `formatDate` and `formatAmount` accept optional Intl format options params for UI flexibility (Phase 3–4 pattern)

---

## Still open / deferred

1. **`fr` / `pt` / `it` translation bundles** — purely additive; gate on product confirming locale priority.

---

## Next session goal (concrete first action)

After PR #8 merges, create branch `refactor/i18n-phase-4-number-formatting` and extend `formatAmount` in `src/utils/History/formatHistoryItem.ts` with explicit `currency` and `locale` params, then update `useStatsHeader.ts` to pass both explicitly — mirroring the Phase 3 pattern applied to `formatDate`.

**Last updated:** 2026-04-26 21:10
