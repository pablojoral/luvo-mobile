# luvo-mobile

React Native app for the Luvo laundry platform. Users discover laundries, scan QR codes, and pay for machines.

## Stack
- React Native 0.84, React 19, TypeScript 5.8
- React Navigation 7 (native-stack + bottom-tabs)
- Zustand 5 — global UI state; TanStack Query v5 — server state
- Axios + Firebase ID token injected per-request via interceptor
- Firebase Auth (`@react-native-firebase/auth`)
- Mapbox (`@rnmapbox/maps`), Vision Camera (QR scan), Reanimated 4

## Project Structure
```
src/
  features/         # One folder per screen (Auth, Laundries, LaundryDetailsModal, Profile, Scan)
  navigation/       # RootStackNavigator, BottomTabNavigator
  query/            # TanStack Query hooks + keys.ts + client.ts
  services/api/     # apiClient.ts (Axios singleton), BaseService, per-resource services
  stores/           # Zustand stores
  components/       # Shared UI
  theme/            # Colors, spacing, typography tokens
  models/           # Shared TypeScript interfaces
ai/                 # Dev tooling scripts (not shipped)
```

## Path Aliases
`components`, `features`, `services`, `theme`, `utils` — configured in `babel.config.js` + `tsconfig.json`.

## Navigation
```
RootStackNavigator
├── Tabs (BottomTabNavigator): Laundries | Scan | Profile
└── LaundryDetailsModal (modal)
```

## Auth Flow
Firebase sign-in → `apiClient` interceptor calls `user.getIdToken()` → attaches as `Authorization: Bearer <token>` on every request. Mobile does not use the server session cookie.

## Common Commands
```bash
npm run start          # Metro bundler
npm run ios / android  # Run on platform
npm run typecheck      # TypeScript check
npm run test           # Jest
npm run icons          # Regenerate SVG icon components
npm run reset:all      # Nuke node_modules + iOS Pods
```

## Conventions
- Server state via TanStack Query (`query/`); global UI state via Zustand (`stores/`)
- All API calls through `services/api/apiClient.ts` — never instantiate Axios elsewhere
- Query keys defined centrally in `query/keys.ts`
- Rule files: @.claude/rules/components.md @.claude/rules/styling.md @.claude/rules/api.md
- Decisions: DECISIONS.md
