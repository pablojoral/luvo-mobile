Upgrade heuristics:

Prioritize:

1. Breaking changes

   - removed APIs
   - changed method signatures

2. Native module compatibility

   - vision-camera
   - mapbox
   - Firebase

3. Core libraries:

   - react-navigation
   - reanimated
   - gesture-handler

4. Configuration:

   - babel config
   - metro config
   - TypeScript config

5. Dependency mismatches:
   - incompatible peer dependencies
   - outdated packages

Flag:

- anything requiring manual native changes (iOS/Android)
- anything that cannot be confidently auto-fixed
