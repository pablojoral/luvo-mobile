# luvo-mobile

React Native app for the Luvo laundromat platform. Users find nearby laundromats, view machine availability, and scan QR codes to start machines.

## Stack

- **Framework**: React Native 0.84, React 19
- **Language**: TypeScript
- **Navigation**: React Navigation 7 (native stack + bottom tabs)
- **State**: Zustand (global), TanStack Query v5 (server state)
- **HTTP**: Axios with Firebase ID token injected per-request
- **Auth**: `@react-native-firebase/auth` — Firebase sign-in; ID token sent to the server via `Authorization: Bearer`
- **Maps**: `@rnmapbox/maps`
- **Camera**: `react-native-vision-camera` (QR scan)
- **Animations**: `react-native-reanimated` + `react-native-gesture-handler`
- **Icons**: `react-native-vector-icons` + custom SVG components via `react-native-svg`
- **Env vars**: `react-native-config` — read via `Config.API_BASE_URL` etc.
- **Testing**: Jest + `@testing-library/react-native`

## Project structure

```
src/
  features/
    Auth/           # Auth.tsx — sign-in screen
    Laundries/      # Laundries.tsx — laundry list/map; theme/
    LaundryDetailsModal/  # Modal screen showing machines for a laundry
    Profile/        # Profile.tsx; components/
    Scan/           # Scan.tsx — QR scanner; components/, hooks/, theme/
  navigation/
    RootStackNavigator/   # Root stack: Tabs + LaundryDetailsModal (modal)
    BottomTabNavigator/   # Bottom tabs: Laundries, Scan, Profile
  query/
    Auth/           # useAuth.ts + __tests__/
    Laundry/        # useLaundries.ts + __tests__/
    client.ts       # TanStack Query client
    keys.ts         # Query key factory
    provider.tsx    # QueryClientProvider wrapper
    useSelectedLaundry.ts
  services/
    api/
      apiClient.ts  # Axios instance; attaches Firebase ID token on every request
      BaseService.ts
      services/     # Per-resource service files
    firebase/
      firebaseAuth.ts
      hooks/
  stores/
    useSelectedLaundry.ts  # Zustand store for the currently selected laundry
  components/       # Shared UI: Button, Icon, MachineCard, Tag, Text, TextInput, SvgIcon, etc.
  models/           # TypeScript model interfaces
  theme/            # Colors, spacing, typography
  types/            # Ambient declarations
  utils/
  assets/
ai/
  runner/           # AI agent scripts (run-agent.ts — review / test / upgrade)
```

## Path aliases

Configured in `babel.config.js` (module-resolver) and `tsconfig.json`:

| Alias        | Resolves to     |
|--------------|-----------------|
| `components` | `src/components`|
| `features`   | `src/features`  |
| `services`   | `src/services`  |
| `theme`      | `src/theme`     |
| `utils`      | `src/utils`     |

## Navigation structure

```
RootStackNavigator
├── Tabs (BottomTabNavigator)
│   ├── Laundries
│   ├── Scan
│   └── Profile
└── LaundryDetailsModal  (modal presentation)
```

## Auth flow

1. User signs in via Firebase (`@react-native-firebase/auth`)
2. `apiClient` interceptor calls `user.getIdToken()` and attaches it as `Authorization: Bearer <token>` on every request
3. Server verifies the token via Firebase Admin SDK and returns a session cookie — the mobile client does **not** use the cookie; it re-uses the Firebase ID token on each request

## Environment variables (`react-native-config`)

Add to `.env` (not committed):
```
API_BASE_URL=http://localhost:3000
```

## Common commands

```bash
# Start Metro bundler
npm run start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Type-check
npm run typecheck

# Tests
npm run test

# Regenerate SVG icon components from assets
npm run icons

# Full reset (node_modules + iOS Pods)
npm run reset:all

# AI agents (dev tooling)
npm run ai:review
npm run ai:test
```

## Conventions

- One screen per feature folder; shared UI in `components/`
- Server state via TanStack Query hooks in `query/`; global UI state via Zustand in `stores/`
- Query keys defined centrally in `query/keys.ts`
- All API calls go through `services/api/apiClient.ts` — never instantiate Axios elsewhere
- SVG icons: use the `Icon` component from `components/Icon`; add new SVGs via `npm run icons`
