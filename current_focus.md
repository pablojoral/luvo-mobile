# Current Focus — luvo-mobile

**Active task:** Awaiting merge of PR #8 (code review passed, no blockers).

**Status:** PR #8 is OPEN — refactor of `formatHistoryItem.ts` to extract locale param complete, 13 unit tests added, code review passed. Gated on design confirmation for CycleCard date format (year dropped).

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

**Code review completed:**
- No blocking issues found
- PR ready to merge

**PR #8 created:**
- URL: https://github.com/pablojoral/luvo-mobile/pull/8
- Title: `refactor(i18n): extract locale param from formatHistoryItem, add pure unit tests`
- Single commit: locale param extraction + unit tests

**⚠️ Design confirmation needed:**
- `useCycleCard.ts` date format changed from `{ day: '2-digit', month: 'short', year: 'numeric' }` to `{ day: 'numeric', month: 'short' }`
- The **year is now dropped** from rendered CycleCard dates
- Need design sign-off: does CycleCard need the year back? If yes, extend `formatDate` with an options param

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

---

## Still open / deferred

1. **CycleCard date format year** — design sign-off needed on whether year should be reinstated. Blocking PR #8 merge.
2. **`fr` / `pt` / `it` translation bundles** — purely additive; gate on product confirming locale priority.

---

## Next session goal (concrete first action)

**Blocked on design confirmation for CycleCard date format:**

1. Check Slack / design system for CycleCard date format requirements (is year necessary?)
2. If yes: extend `formatDate(date, locale?, options?)` with options param in `src/utils/History/formatHistoryItem.ts`
3. Update `useCycleCard.ts` to pass `{ day: '2-digit', month: 'short', year: 'numeric' }` via options
4. Run `pnpm test` to verify no regressions
5. If design confirms no year needed: merge PR #8 as-is
6. Create a new branch `refactor/i18n-phase-4-*` with remaining locale-aware refactors (e.g., currency symbols, number formatting for large values)

**Last updated:** 2026-04-26 20:55
