# Current Focus — luvo-mobile

**Active task:** it-IT i18n bundle — create full 197-key translation, register in resources.ts, test, and open PR.

**Status:** `complete` — pt-BR bundle (PR #11) and fr bundle (PR #9) opened. Both awaiting review/merge.

---

## Completed (2026-04-27, Session 7: pt-BR i18n Bundle + PR #11)

- `src/services/i18n/locales/pt/common.json` created: 197 keys, full parity with `en`, `es`, `fr`
- `src/services/i18n/resources.ts` updated to register `pt` locale in i18next
- Branch `feat/i18n-pt-bundle` pushed, PR #11 opened: https://github.com/pablojoral/luvo-mobile/pull/11
- DECISIONS.md updated: ADR-005 appended with decision to promote `fr` and `pt` to fully-translated tier (supersedes ADR-002)
- No typecheck or test regressions
- Status: awaiting PR review; #9 (fr) and #11 (pt) both pending merge

---

## Completed (2026-04-27, Session 6: fr Translation Bundle + PR #9)

- PR #8 (`refactor/format-history-item-locale-param`) confirmed merged to master
- Test suite verified on master: 20 unit tests pass; 4 pre-existing failing suites identified (Firebase auth mock, AsyncStorage mock, react-native-localize mock — unrelated to this PR)
- `src/services/i18n/locales/fr/common.json` created: 197 keys, full parity with `en` and `es`
- `src/services/i18n/resources.ts` updated to register `fr` in i18next
- Branch `feat/i18n-fr-bundle` pushed, PR #9 opened: https://github.com/pablojoral/luvo-mobile/pull/9
- ADR-002 update (DECISIONS.md) deferred by user choice — `fr` is now fully-translated but DECISIONS.md still reflects it as picker-only

---

## Completed (2026-04-26, Session 5: Phase 4 Number Formatting with Options)

**Phase 4 refactoring complete:**
- `formatAmount` extended with optional `options?: Intl.NumberFormatOptions` param
- Pattern mirrors Phase 3 `formatDate` exactly: backward-compatible, pure function, options passed from call sites
- `useStatsHeader.ts` intentionally unchanged — defaults are correct for that call site
- New test cases added to `src/utils/History/__tests__/formatHistoryItem.test.ts`
- All 20 unit tests pass

**Commit ca1a4f2 pushed:**
- Branch: `refactor/format-history-item-locale-param`
- PR #8 now complete with all three phases

**PR #8 status:**
- Ready to merge to master
- All code review gates cleared
- All design confirmation gates cleared

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
- `fr` now has a full JSON bundle (197 keys) — `pt`/`it` still fall back to `es` via i18next `fallbackLng`
- Device language auto-detected on startup; picker overrides it
- Component hooks call `useTranslation`; components themselves never do
- ADR-004: For service/strategy i18n, return machine-readable codes from service, translate at React boundary (hook)
- Formatting utilities (`formatHistoryItem`, etc.) accept locale as explicit parameter; no singleton imports
- **ADR-005:** `formatDate` and `formatAmount` accept optional Intl format options params for UI flexibility (Phase 3–4 pattern)
- **NOTE:** DECISIONS.md still shows `fr` as picker-only — ADR-002 update was deferred; update it when `pt` bundle lands

---

## Still open / deferred

1. **`pt` and `it` translation bundles** — gated on product confirming locale priority.
2. **Pre-existing test infrastructure gaps (4 suites):** AsyncStorage mock, react-native-localize mock, Firebase auth mock — unrelated to i18n work, tracked for future test-infra sprint.
3. **ADR-002 in DECISIONS.md** — still shows `fr` as picker-only fallback; update when `pt` bundle is added.

---

## Completed (2026-04-27, Session 7 (continued): it-IT i18n Bundle + PR #12)

- `src/services/i18n/locales/it/common.json` created: 197 keys, full parity with `en`, `es`, `fr`, `pt`
- `src/services/i18n/resources.ts` updated to register `it` locale in i18next
- Branch `feat/i18n-it-bundle` pushed, PR #12 opened: https://github.com/pablojoral/luvo-mobile/pull/12
- All locale bundles now complete: en/es/fr/pt/it fully translated
- Status: awaiting PR review; #9 (fr), #11 (pt), #12 (it) all pending merge

---

## Next session goal (concrete first action)

Adapt useTheme, DefaultTheme and all styles in the app to use the new dewsign system:

/* =============================================================
   Luvo Design System â€” Colors & Type
   Source of truth: luvo-mobile/src/theme + ManualDeMarca.pdf
   Poppins (Google Fonts) â€” ExtraBold for titles, Regular for body
   ============================================================= */

/* Local Poppins â€” the brand font, shipped with the design system */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url('fonts/Poppins-Thin.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 100;
  font-display: swap;
  src: url('fonts/Poppins-ThinItalic.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url('fonts/Poppins-ExtraLight.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 200;
  font-display: swap;
  src: url('fonts/Poppins-ExtraLightItalic.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url('fonts/Poppins-Light.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: url('fonts/Poppins-LightItalic.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('fonts/Poppins-Regular.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url('fonts/Poppins-Italic.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('fonts/Poppins-Medium.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 500;
  font-display: swap;
  src: url('fonts/Poppins-MediumItalic.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('fonts/Poppins-SemiBold.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 600;
  font-display: swap;
  src: url('fonts/Poppins-SemiBoldItalic.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('fonts/Poppins-Bold.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: url('fonts/Poppins-BoldItalic.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url('fonts/Poppins-ExtraBold.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 800;
  font-display: swap;
  src: url('fonts/Poppins-ExtraBoldItalic.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url('fonts/Poppins-Black.ttf') format('truetype');
}
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 900;
  font-display: swap;
  src: url('fonts/Poppins-BlackItalic.ttf') format('truetype');
}

:root {
  /* ---------- Essentials ---------- */
  --colors-white: #FEFEFE;
  --colors-black: #000000;
  --colors-transparent: transparent;
  --colors-semi-transparent: rgba(0, 0, 0, 0.5);

  /* ---------- Grey scale ---------- */
  --colors-grey-25:  #f4f4f5;
  --colors-grey-50:  #eaeaeb;
  --colors-grey-100: #d5d6d7;
  --colors-grey-200: #abadb0;
  --colors-grey-300: #828488;
  --colors-grey-400: #585b61;
  --colors-grey-500: #2f323a; /* brand charcoal */
  --colors-grey-600: #25282e;
  --colors-grey-700: #1c1e22;
  --colors-grey-800: #121417;
  --colors-grey-900: #090a0b;

  /* ---------- Lavender (primary) ---------- */
  --colors-lavender-25:  #fcfbfd;
  --colors-lavender-50:  #faf7fb;
  --colors-lavender-100: #f6f0f8;
  --colors-lavender-200: #eee2f2;
  --colors-lavender-300: #e6d4ec;
  --colors-lavender-400: #dec6e6;
  --colors-lavender-500: #d6b8e0;
  --colors-lavender-600: #ab93b3;
  --colors-lavender-700: #806e86;
  --colors-lavender-800: #554959;
  --colors-lavender-900: #2a242c;

  /* ---------- Rose (secondary) ---------- */
  --colors-rose-25:  #fdf6f7;
  --colors-rose-50:  #fbeef0;
  --colors-rose-100: #f7dee2;
  --colors-rose-200: #efbdc6;
  --colors-rose-300: #e79ca9;
  --colors-rose-400: #df7b8d;
  --colors-rose-500: #d75b71; /* brand rose */
  --colors-rose-600: #ac485a;
  --colors-rose-700: #813643;
  --colors-rose-800: #56242d;
  --colors-rose-900: #2b1216;

  /* ---------- Mint (from brand manual #D0F4DE) ---------- */
  --colors-mint:     #d0f4de;
  --colors-green-25: #f3fcf4;
  --colors-green-50: #e6f9e6;
  --colors-green-100:#c8f0cb;
  --colors-green-300:#70d77a;
  --colors-green-500:#00B300;
  --colors-green-700:#117a12;
  --colors-green-900:#0b4e0b;

  /* ---------- Status ---------- */
  --colors-red-25:  #fff6f6;
  --colors-red-50:  #fbeef0;
  --colors-red-100: #FFEDED;
  --colors-red-300: #ff9b9b;
  --colors-red-500: #FF5959;
  --colors-red-600: #FF3B3B;
  --colors-red-800: #b62424;
  --colors-red-900: #7a1414;

  --colors-yellow-25: #fffbf3;
  --colors-yellow-50: #fbeef0;
  --colors-yellow-100:#fff1c2;
  --colors-yellow-300:#ffdf70;
  --colors-yellow-500:#FFCD00;
  --colors-yellow-600:#e6b800;
  --colors-yellow-800:#997a00;
  --colors-yellow-900:#664e00;

  /* =============================================================
     SEMANTIC TOKENS
     These mirror the RN theme hooks â€” use these in components.
     ============================================================= */

  /* Surfaces */
  --surface-primary:     var(--colors-lavender-50);   /* cards */
  --surface-secondary:   var(--colors-rose-50);       /* secondary buttons */
  --surface-tertiary:    var(--colors-grey-100);      /* pill selector bg */
  --surface-background:  var(--colors-lavender-200);  /* screen bg */
  --surface-surface:     var(--colors-lavender-300);  /* raised */
  --surface-disabled:    var(--colors-lavender-600);
  --surface-invert:      var(--colors-lavender-500);  /* primary button / FAB */
  --surface-success:     var(--colors-green-50);
  --surface-error:       var(--colors-red-50);
  --surface-warning:     var(--colors-yellow-50);

  /* Text */
  --font-primary:     var(--colors-grey-900);
  --font-secondary:   var(--colors-lavender-500);
  --font-highlight:   var(--colors-rose-500);
  --font-light:       var(--colors-grey-400);
  --font-disabled:    var(--colors-grey-400);
  --font-placeholder: var(--colors-grey-400);
  --font-invert:      var(--colors-white);
  --font-error:       var(--colors-red-600);
  --font-success:     var(--colors-green-500);
  --font-warning:     var(--colors-yellow-600);

  /* Borders */
  --border-primary:     var(--colors-grey-300);
  --border-secondary:   var(--colors-grey-100);
  --border-disabled:    var(--colors-grey-100);
  --border-placeholder: var(--colors-grey-400);
  --border-invert:      var(--colors-white);
  --border-error:       var(--colors-red-300);
  --border-transparent: transparent;

  /* =============================================================
     Spacing (px, mirrors RN theme scale)
     ============================================================= */
  --spacing-none:   0;
  --spacing-xxxs:   2px;
  --spacing-xxs:    4px;
  --spacing-xs:     8px;
  --spacing-sm:     12px;
  --spacing-md:     16px;
  --spacing-lg:     20px;
  --spacing-xl:     24px;
  --spacing-xxl:    32px;
  --spacing-xxxl:   40px;
  --spacing-xxxxl:  48px;
  --spacing-max:    96px;

  /* Border widths */
  --border-width-none: 0;
  --border-width-xs:   1px;
  --border-width-sm:   2px;
  --border-width-md:   3px;
  --border-width-lg:   4px;
  --border-width-xl:   5px;
  --border-width-xxl:  6px;
  --border-width-xxxl: 8px;

  /* Corner radii */
  --corner-rad-none: 0;
  --corner-rad-sm:   4px;
  --corner-rad-md:   8px;
  --corner-rad-lg:   12px;
  --corner-rad-xl:   16px;
  --corner-rad-xxl:  24px;
  --corner-rad-xxxl: 32px;
  --corner-rad-full: 9999px;

  /* Shadow (mirror of shadowBox in RN theme) */
  --shadow-box: 0 2px 3.84px rgba(0, 0, 0, 0.25);
  --shadow-card: 0 4px 16px rgba(42, 36, 44, 0.08);
  --shadow-floating: 0 8px 24px rgba(42, 36, 44, 0.12);

  /* =============================================================
     Typography
     ============================================================= */
  --font-family-base: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Weights */
  --font-weight-light:     300;
  --font-weight-regular:   400;
  --font-weight-medium:    500;
  --font-weight-semibold:  600;
  --font-weight-bold:      700;
  --font-weight-extrabold: 800; /* titles per brand manual */

  /* Sizes */
  --font-size-xs:    12px;
  --font-size-sm:    14px;
  --font-size-md:    16px;
  --font-size-lg:    18px;
  --font-size-xl:    20px;
  --font-size-xxl:   24px;
  --font-size-xxxl:  28px;
  --font-size-xxxxl: 32px;

  /* Line heights */
  --line-height-xs:   16px;
  --line-height-sm:   18px;
  --line-height-md:   20px;
  --line-height-lg:   22px;
  --line-height-xl:   24px;
  --line-height-xxl:  28px;
  --line-height-xxxl: 32px;
}

/* =============================================================
   Base / reset
   ============================================================= */
*, *::before, *::after { box-sizing: border-box; }
html, body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  line-height: var(--line-height-md);
  color: var(--font-primary);
  background: var(--surface-background);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* =============================================================
   Semantic type styles â€” use class or element
   Titles use Poppins ExtraBold (per brand manual)
   Body uses Poppins Regular
   ============================================================= */
h1, .h1 {
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-extrabold);
  font-size: var(--font-size-xxxxl);
  line-height: var(--line-height-xxxl);
  letter-spacing: -0.01em;
  margin: 0;
  color: var(--font-primary);
}
h2, .h2 {
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-extrabold);
  font-size: var(--font-size-xxxl);
  line-height: var(--line-height-xxxl);
  letter-spacing: -0.01em;
  margin: 0;
  color: var(--font-primary);
}
h3, .h3 {
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-extrabold);
  font-size: var(--font-size-xxl);
  line-height: var(--line-height-xxl);
  margin: 0;
  color: var(--font-primary);
}
h4, .h4 {
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-lg);
  margin: 0;
  color: var(--font-primary);
}
.eyebrow {
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--font-secondary);
}
p, .body {
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-md);
  line-height: var(--line-height-lg);
  margin: 0;
  color: var(--font-primary);
}
.body-sm {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-md);
  color: var(--font-light);
}
.caption {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  color: var(--font-placeholder);
}
.label {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--font-primary);
}
.display {
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-extrabold);
  font-size: 56px;
  line-height: 60px;
  letter-spacing: -0.02em;
  color: var(--font-primary);
}

/* Focus / accessibility */
:focus-visible {
  outline: 2px solid var(--colors-rose-500);
  outline-offset: 2px;
  border-radius: var(--corner-rad-sm);
}


**Last updated:** 2026-04-27 15:11
