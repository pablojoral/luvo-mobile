# Architectural Decisions — luvo-mobile

## Existing Decision Sources
- `CLAUDE.md` — stack guide, navigation structure, auth flow, env vars, conventions
- `.claude/rules/components.md` — one component per file, no inline logic, theme hooks
- `.claude/rules/styling.md` — useTheme, StyleSheet.create, no inline styles
- `.claude/rules/api.md` — apiClient singleton, service classes, TanStack Query, query key pattern

## Index
| # | Date | Title | Status |
|---|------|-------|--------|
| ADR-001 | 2026-04-26 | i18n library and architecture (i18next + react-i18next + react-native-localize) | Accepted |
| ADR-002 | 2026-04-26 | Locale support tiers (en/es full, fr/pt/it picker-only with es fallback) | Accepted |
| ADR-003 | 2026-04-26 | Translation boundary lives at the React layer; services and strategies stay i18n-agnostic | Accepted |
| ADR-004 | 2026-04-26 | Cross-boundary user-facing strings emitted as codes, resolved via co-located registry at React boundary | Accepted |

## Entries

<!-- TEMPLATE — copy and fill for each new entry
### ADR-XXX: <title>
**Date:** YYYY-MM-DD
**Status:** Accepted | Superseded by ADR-YYY

**Context:**
What situation or constraint prompted this decision?

**Decision:**
What was decided and why?

**Rejected alternatives:**
What else was considered and why it was ruled out?

**Consequences:**
What does this enable, constrain, or defer?
-->

### ADR-001: i18n library and architecture (i18next + react-i18next + react-native-localize)
**Date:** 2026-04-26
**Status:** Accepted

**Context:**
Phase 2 of i18n needed a library choice plus a discipline for where translation lookups happen. Components in this codebase already follow a strict "no logic in component files" rule (see `.claude/rules/components.md`), so any i18n integration had to fit that boundary cleanly. We also wanted automatic device-language detection on cold start, plus a runtime override path via the in-app picker.

**Decision:**
Adopt `i18next` + `react-i18next` + `react-native-localize`. `useTranslation` is called only inside component hooks (`use<Component>.ts`) — never in component files. The `SupportedLanguage` type lives exclusively in `src/services/i18n/languages.ts` and is the single source of truth. Device language is auto-detected at cold start via `react-native-localize`; the picker calls `i18n.changeLanguage(lang)` to override at runtime.

**Rejected alternatives:**
- FormatJS / `react-intl`: heavier bundle, ICU-message-format-first, and less ergonomic fallback configuration than i18next's `fallbackLng`.
- Home-grown React Context + JSON dictionaries: no plurals, no interpolation, no formatters out of the box — would have to be reimplemented and maintained.

**Consequences:**
- All 75+ translated files follow the hook-only pattern uniformly; adding a translatable string always means editing the hook, never the JSX.
- `useTranslation` calls inside component bodies are now a lint/review-time violation, consistent with the existing components rule.
- `SupportedLanguage` cannot be redeclared elsewhere; downstream code must import from `src/services/i18n/languages.ts`.

---

### ADR-002: Locale support tiers (en/es full, fr/pt/it picker-only with es fallback)
**Date:** 2026-04-26
**Status:** Accepted

**Context:**
The product wants the language picker to expose five locales (en, es, fr, pt, it) for market-perception reasons, but only en and es have committed translation work. We needed a way to ship the picker without blocking on translation deliverables for the lower-priority markets, and without showing missing-key placeholders in the UI.

**Decision:**
Treat locales as two tiers. **Fully translated:** `en` and `es` (183 keys each, perfect parity). **Picker-only:** `fr`, `pt`, `it` — exposed in the picker but with no bundles registered; i18next's `fallbackLng: 'es'` resolves missing keys silently, so users selecting these locales see Spanish content with no visible breakage.

**Rejected alternatives:**
- Hide fr/pt/it from the picker until bundles exist: rejected because the picker UX is itself a marketing signal of locale support roadmap.
- Machine-translate fr/pt/it placeholders: rejected as worse than a clean Spanish fallback for product quality.

**Consequences:**
- Adding a new locale to the fully-translated tier is purely additive: drop a `common.json` under `src/services/i18n/locales/<lang>/` and register it in `src/services/i18n/resources.ts`. No code changes elsewhere.
- The en↔es parity invariant (currently 183/183) becomes a maintenance contract — a CI check for key parity between en and es is a logical follow-up.
- Users in fr/pt/it locales receive Spanish content silently; this is intentional and must be documented in user-facing release notes when the tier policy changes.

---

### ADR-003: Translation boundary lives at the React layer; services and strategies stay i18n-agnostic
**Date:** 2026-04-26
**Status:** Accepted

**Context:**
During Phase 2 wiring, the payment flow exposed a tension: strategy classes' `onProgress` callbacks and `result?.error` values are produced inside non-React modules (services, strategy implementations). Translating them in place would require either injecting `t` into a strategy constructor (leaking React/i18next concerns into service code) or returning pre-translated raw strings (which couples the service layer to the active locale and breaks if the user changes language mid-flow).

**Decision:**
Non-React modules (services, strategies, anything outside the React tree) do **not** call `useTranslation` and do **not** receive `t` as a parameter. They return machine-readable codes or i18n keys. Translation happens exclusively at the React boundary — typically the component hook that consumes the service result. Strategies emit codes; hooks translate.

**Rejected alternatives:**
- Inject `t` into strategy constructors: leaks React/i18next concerns into service code, makes services harder to test in isolation, and ties their lifecycle to a React render context.
- Return raw localized strings from services: couples service output to the active locale at call time and breaks when the user switches language while a result is held in state.

**Consequences:**
- Payment `onProgress` strings and `result?.error` values remain untranslated in this phase. This is intentional, not an oversight.
- A follow-up phase must introduce an error-code/progress-code registry (codes → i18n keys) so the React layer can resolve them. Until that lands, those user-facing strings stay in their source language.
- Any new service or strategy added going forward must follow this boundary; reviewers should reject PRs that thread `t` into non-React code.
