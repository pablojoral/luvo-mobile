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
| ADR-002 | 2026-04-26 | Locale support tiers (en/es full, fr/pt/it picker-only with es fallback) | Superseded by ADR-005 |
| ADR-003 | 2026-04-26 | Translation boundary lives at the React layer; services and strategies stay i18n-agnostic | Accepted |
| ADR-004 | 2026-04-26 | Cross-boundary user-facing strings emitted as codes, resolved via co-located registry at React boundary | Accepted |
| ADR-005 | 2026-04-27 | Promote fr and pt to fully-translated tier; only it remains picker-only | Accepted |
| ADR-006 | 2026-05-13 | `@luvo/ui` as a standalone package (not monorepo) | Accepted |
| ADR-007 | 2026-05-13 | Platform split via headless hooks + `.tsx`/`.web.tsx` shells | Accepted |
| ADR-008 | 2026-05-13 | Design tokens are numeric primitives; CSS units added by a per-platform adapter | Accepted |
| ADR-009 | 2026-05-13 | `@luvo/ui` is i18n-agnostic; all user-facing strings enter as props | Accepted |
| ADR-010 | 2026-05-13 | Domain-heavy and platform-SDK-bound components stay in `apps/mobile` | Accepted |

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

---

### ADR-004: Cross-boundary user-facing strings from non-React modules are emitted as codes from a closed union and resolved at the React boundary via a co-located code→key registry
**Date:** 2026-04-26
**Status:** Accepted

**Context:**
ADR-003 established that services and strategies stay i18n-agnostic, but left the implementation pattern abstract. When the payment flow required surfacing progress beats and failure reasons to the UI, a concrete mechanism was needed. The registry pattern generalises ADR-003 from a prohibition into a prescription.

**Decision:**
Non-React modules (strategies, services) emit typed codes from a closed string-literal union (e.g. `PaymentProgressCode`, `PaymentErrorCode`). A co-located registry file (`paymentCodes.ts`) maps each code to an i18n key using `as const satisfies Record<UnionType, string>` for build-time exhaustiveness. Translation happens at the React boundary — the component hook calls `t(REGISTRY[code])`. The code union and registry live next to the interface that produces them (e.g. `src/features/Payment/strategies/paymentCodes.ts`).

**Rejected alternatives:**
- Emit i18n keys directly from strategies — stable domain codes are more durable than translation-layer key names; logs and analytics benefit from machine-readable codes.
- Inject `t` into strategy constructors — ruled out by ADR-003 (React concerns must not leak into service/strategy code).

**Consequences:**
- Any new strategy or service that needs to surface user-facing copy must follow this pattern: code union + registry + React-boundary resolution. Reviewers should reject PRs that thread `t` into non-React code or return pre-translated strings.
- Adding a code without a registry entry is a build error (`satisfies` constraint).
- The pattern is the canonical implementation of ADR-003.

---

### ADR-005: Promote fr and pt to fully-translated tier; only it remains picker-only
**Date:** 2026-04-27
**Status:** Accepted — supersedes ADR-002

**Context:**
ADR-002 (2026-04-26) defined two locale tiers: fully translated (en, es) and picker-only (fr, pt, it — exposed in the picker but with no bundles registered; i18next `fallbackLng: 'es'` resolves missing keys silently). Since then, fr was fully translated in PR #9 (197 keys, prior session) and pt (pt-BR) was fully translated in this session (197 keys). Both now have full key parity with en and es. The tiering described in ADR-002 no longer matches the shipped state; `current_focus.md` had already flagged the drift.

**Decision:**
Reclassify locale tiers. **Fully translated:** `en`, `es`, `fr`, `pt` (197 keys each, full parity). **Picker-only (es fallback):** `it` only. The mechanism is unchanged — fr and pt now have registered bundles under `src/services/i18n/locales/<lang>/` and are wired in `src/services/i18n/resources.ts`; `it` continues to resolve missing keys via `fallbackLng: 'es'`. The parity invariant is widened from en↔es to en↔es↔fr↔pt (197 keys).

**Rejected alternatives:**
- Leave ADR-002 as-is and rely on `current_focus.md` / commit history for current state: rejected — ADR-002 is consulted as source of truth for locale policy; stale ADRs cause drift in reviews and onboarding.
- Edit ADR-002 in place: rejected — `DECISIONS.md` is append-only; superseding entries are the documented mechanism.

**Consequences:**
- ADR-002 marked Superseded by ADR-005 in the index.
- Adding a string now requires updating four bundles (en/es/fr/pt) instead of two.
- Only `it` remains picker-only; when it lands, the fallback policy reduces to a safety net.
- A CI key-parity check (proposed as follow-up in ADR-002) should now cover all four fully-translated locales.

---

### ADR-006: `@luvo/ui` as a standalone package (not monorepo)
**Date:** 2026-05-13
**Status:** Accepted

**Context:**
The team wanted to share base UI components and the design system between `luvo-mobile` (React Native) and a future Luvo admin web app. Two structural options were considered: converting the `luvo-mobile` repo into a workspace monorepo (`apps/mobile` + `packages/ui`) or creating a standalone `@luvo/ui` package in a separate repo.

**Decision:**
Create `@luvo/ui` as a standalone package in its own repo at `/home/pablitucks/Projects/luvo-ui/`. Mobile consumes it via `"@luvo/ui": "file:../luvo-ui"` during development and as a GitHub Packages release in production. The monorepo restructure (moving existing `src/` to `apps/mobile/`) was rejected to minimize blast radius on an active project.

**Rejected alternatives:**
- Monorepo (`apps/mobile` + `packages/ui` in the same repo): tightest dev loop and type coherence, but moving `luvo-mobile`'s `src/` to `apps/mobile/` would require updating all CI, deployment configs, and import path aliases at once.
- Local `packages/ui` subfolder inside `luvo-mobile` without moving `apps/`: cleaner than full restructure but still conflates the app repo with the design-system package.

**Consequences:**
- `@luvo/ui` has its own versioning (semver + changesets); breaking changes require a coordinated dep bump in mobile.
- Metro configuration in `luvo-mobile` needs `watchFolders` and `resolver.nodeModulesPaths` pointing to `../luvo-ui/src` for the local file-link to hot-reload correctly.
- Admin app (when created) joins by consuming `@luvo/ui` as a normal npm/GitHub Packages dep — no structural coupling to the mobile repo.

---

### ADR-007: Platform split via headless hooks + `.tsx`/`.web.tsx` shells
**Date:** 2026-05-13
**Status:** Accepted

**Context:**
`@luvo/ui` must export components that work in both React Native (which uses `StyleSheet`, `View`, `Text` etc.) and a React web app (which uses HTML/CSS). Three approaches were considered.

**Decision:**
Each component is split into:
- `hooks/use<Component>.ts` — shared logic, no platform imports
- `<Component>.tsx` — RN shell (uses RN primitives + `StyleSheet`)
- `<Component>.web.tsx` — web shell (uses HTML elements + plain style objects)
- `theme/use<Component>Theme.ts` — RN style hook
- `theme/use<Component>Theme.web.ts` — web style hook

Bundlers (Metro, webpack, Vite) resolve the `.web.tsx` variant for web targets automatically. This mirrors the existing `use<Component>` hook pattern already enforced in `luvo-mobile`'s `.claude/rules/components.md`.

**Rejected alternatives:**
- `react-native-web` as compat layer: single component file, but adds ~50 kB to the web bundle and constrains web styling to RN's subset. Hover/focus states still require additional CSS-in-JS. Rejected.
- Platform-suffixed files without headless hooks: same bundle resolution, but would duplicate logic across `.tsx` and `.web.tsx` rather than sharing it via the hook.

**Consequences:**
- Logic hooks (`hooks/use<Component>.ts`) must never import from `react-native` or DOM types. Enforceable via `eslint no-restricted-imports` scoped to that path pattern.
- Adding a new component always requires two shell files, two style hooks, one logic hook, one types file. This is the trade for clean platform separation.
- `react-native-web` is now explicitly ruled out; a future reversal requires its own ADR.

---

### ADR-008: Design tokens are numeric primitives; CSS units are added by a per-platform adapter
**Date:** 2026-05-13
**Status:** Accepted

**Context:**
Spacing, font sizes, and radii in `luvo-mobile`'s theme system are numeric (e.g. `spacing['spacing-sm'] = 8`). RN's `StyleSheet` consumes numbers directly. A web consumer needs CSS units (e.g. `'8px'`). Two options: store tokens as numbers and convert at the style-hook layer, or store them as strings with `px` already baked in.

**Decision:**
Tokens stay as numbers throughout `@luvo/ui`. A thin adapter at `src/web/cssAdapter.ts` exports `toPx(n: number): string` for use inside web style hooks. RN style hooks use the number directly. Token files never contain `'8px'`-style strings.

**Rejected alternatives:**
- String tokens with `px` baked in: RN would need to strip the `px` suffix everywhere it reads a spacing value — implicit silent breakage if a developer forgets.
- Separate number and string token maps: doubles the token surface area and creates a synchronization maintenance burden.

**Consequences:**
- All `BaseTheme` numeric fields (spacing, fontSize, cornerRad, etc.) are `number`, not `string | number`.
- Web style hooks in `@luvo/ui` call `toPx()` when passing sizes to CSS properties.
- Adding a new token must be a number. PRs that introduce `'16px'`-style token values are a review-time violation.

---

### ADR-009: `@luvo/ui` is i18n-agnostic; all user-facing strings enter as props
**Date:** 2026-05-13
**Status:** Accepted — extends ADR-003 and ADR-004

**Context:**
`luvo-mobile` enforces via ADR-003 that the translation boundary lives at the React layer, and via ADR-004 that cross-boundary strings are emitted as codes and resolved at the React boundary. `@luvo/ui` is a new React layer that ships components to both mobile and a future admin app.

**Decision:**
`@luvo/ui` contains zero `useTranslation` calls and zero `i18next` imports. Every user-facing string a component needs to display (labels, placeholders, error messages) is received as a typed prop. Consumers (mobile hooks, future admin hooks) are responsible for passing already-translated strings.

**Rejected alternatives:**
- Bundle `i18next` into `@luvo/ui` with a shared namespace: creates a translation synchronization contract between mobile and admin app; both would need to ship the same locale keys. Too tight a coupling.
- Ship raw English strings as defaults: better than the above but still leaks language choices into a shared dependency.

**Consequences:**
- Extends ADR-003's translation boundary principle explicitly to the package boundary. Reviewers should reject any `useTranslation` import inside `packages/luvo-ui/src/`.
- Component props interfaces include `string` fields for all visible copy (e.g. `Button.label`, `TextInput.placeholder`, `TextInput.error`).
- Consistent with ADR-004: components that emit events with user-facing feedback should emit codes, not translated strings, if they have internal error states.

---

### ADR-010: Domain-heavy and platform-SDK-bound components stay in `apps/mobile`
**Date:** 2026-05-13
**Status:** Accepted

**Context:**
When designing `@luvo/ui`, some existing `luvo-mobile` components were candidates for extraction. Components that depend on platform-specific SDKs or contain business domain logic specific to the laundry machine use case were flagged.

**Decision:**
The following component categories are explicitly excluded from `@luvo/ui` Phase 1–2 and remain in `apps/mobile` until the admin app has a concrete consumer:
- **RN-only runtime deps:** `BottomSheet`, `ActionModal`, `SelectInput` (depend on `react-native-reanimated` + `react-native-gesture-handler`; web equivalents need a different engine).
- **Navigation-coupled:** `ScreenHeader`, `SafeScreenHeader`, `SettingsMenu` (depend on `@react-navigation/native` APIs).
- **Auth-SDK-bound:** `SocialAuth`, `GoogleSignInButton`, `AppleSignInButton`, `AuthRequiredScreen`, `AuthModeToggle` (depend on `@react-native-google-signin/google-signin` and `@invertase/react-native-apple-authentication`).
- **Domain-specific:** `MachineCard`, `LaundryMapMarker`, `WsStatusIndicator`, `LocationLabel` (tightly coupled to laundry-machine data models; no current web consumer).

**Rejected alternatives:**
- Migrate everything immediately: forces speculative cross-platform abstractions for components with no current web consumer; BottomSheet's web equivalent requires a sheet-management library choice that hasn't been made.
- Create RN-only entry point in `@luvo/ui` for excluded components: splits the package's consumer contract and makes the "which entry do I import from?" question harder to answer.

**Consequences:**
- `@luvo/ui` stays lean and installable in non-RN environments without pulling in RN-only native deps.
- When the admin app needs a bottom sheet, a new ADR is required to pick the web engine (Radix, Vaul, etc.) and decide whether it merges into `@luvo/ui` or stays separate.
- `luvo-mobile/src/components/` retains the excluded components; they are not deprecated or marked for migration until there is a real cross-app consumer.
