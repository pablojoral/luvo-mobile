Core stack:

- React Native (0.81)
- React (19)
- TypeScript (strict mode)

State management:

- React Query (@tanstack/react-query) for server state
- Zustand for client/local state

Navigation:

- React Navigation:
  - @react-navigation/native
  - native-stack
  - bottom-tabs

Networking:

- Axios for HTTP requests
- @react-native-community/netinfo for network state handling

Authentication & backend:

- Firebase:
  - @react-native-firebase/app
  - @react-native-firebase/auth

Maps & location:

- @rnmapbox/maps

Forms:

- React Hook Form

UI & interaction:

- react-native-gesture-handler
- react-native-reanimated
- react-native-screens
- react-native-safe-area-context

Icons & assets:

- react-native-svg
- react-native-vector-icons
- SVGR (for transforming SVGs into components)

Device capabilities:

- react-native-vision-camera

Configuration:

- react-native-config (environment variables)

Architecture conventions:

- React Query is the source of truth for server state
- Zustand is used for lightweight client state
- Axios is used for API communication
