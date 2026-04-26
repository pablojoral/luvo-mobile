# Current Focus — luvo-mobile

**Active task:** Awaiting merge of PR #6 (code review passed, no blockers).

**Status:** PR #6 is OPEN and MERGEABLE — rebase completed, all 7 commits replayed cleanly, code review passed with only a minor suggestion. Ready for human merge.

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

**PR created (session 1):**
- URL: https://github.com/pablojoral/luvo-mobile/pull/6
- Title: `refactor(swipe-actions): split QRSwipeAction + RemoveSwipeAction, extract theme hooks; i18n hook boundary (Phase 1–3)`
- 7 commits: 2 SwipeActions refactor + 5 i18n Phase 1–3

**i18n Phase 3 follow-up #5:**
- `src/utils/History/formatHistoryItem.ts` — replaced `'es-UY'` hardcode with `i18n.language` singleton in `formatAmount` and `formatDate`
- Committed: `445450f`

**i18n Phase 3 follow-up #4:**
- `src/components/AvailabilityTag/hooks/useAvailabilityTag.ts` — replaced dynamic `` t(`machines.status.${status}`) `` with `STATUS_LABEL_KEYS` const (`as const satisfies Record<MachineStatus, string>`)
- Committed: `039a818`

**i18n Phase 3 follow-up #2:**
- `src/features/History/components/CycleCard/hooks/useCycleCard.ts` — locale-aware date formatting via `Intl.DateTimeFormat(i18n.language, ...)`
- Committed: `e5f62c2`

**i18n Phase 3 follow-up #1:**
- `src/features/Payment/strategies/paymentCodes.ts` — payment code/error registry + 14 i18n keys in `en/common.json` and `es/common.json`; translation boundary at `usePaymentScreen`
- ADR-004 recorded
- Committed: `fd6b574`

**SwipeActions refactor:**
- `QRSwipeAction` and `RemoveSwipeAction` extracted into separate component files; per-component theme hooks added
- Committed: `fe904a3`

---

## Architecture decisions in effect

- `SupportedLanguage = 'es' | 'en' | 'fr' | 'pt' | 'it'` lives ONLY in `src/services/i18n/languages.ts`
- Only `en` and `es` have JSON bundles — `fr`/`pt`/`it` fall back to `es` via i18next `fallbackLng`
- Device language auto-detected on startup; picker overrides it
- Component hooks call `useTranslation`; components themselves never do
- ADR-004: For service/strategy i18n, return machine-readable codes from service, translate at React boundary (hook)

---

## Still open / deferred

1. **`formatHistoryItem` testability** — imports i18n singleton directly; worth extracting locale as a parameter in a future pass. Non-blocking.
2. **`fr` / `pt` / `it` translation bundles** — purely additive; gate on product confirming locale priority.

---

## Next session goal (concrete first action)

**Gated on PR #6 merging first.** Once PR #6 is merged to master:

1. Pull master: `git fetch origin master && git checkout master && git pull`
2. Open `src/utils/History/formatHistoryItem.ts`
3. Refactor `formatAmount(amount, currency)` to accept an optional third parameter: `locale?: string` (default `i18n.language`)
4. Refactor `formatDate(date)` to accept an optional second parameter: `locale?: string` (default `i18n.language`)
5. Remove the direct `i18n` singleton import from the module — all i18n calls move to the calling site (hooks)
6. Update all call sites to pass `locale` explicitly (via `useTranslation().i18n.language`)
7. Add unit tests in `__tests__/formatHistoryItem.test.ts` (now mockable without i18n mocking)
8. Verify no import-order or lint regressions; commit when green

This removes the hard singleton dependency, making the formatting functions unit-testable and more reusable in non-React contexts (e.g., server components).

**Last updated:** 2026-04-26 19:52
