Project overview:

This is a React Native mobile application for a self-service laundry system where users interact with physical washing machines and dryers through the app.

The app handles:

- machine discovery and availability
- payment processing
- real-time machine state updates
- time-based cycle tracking

The system must ensure consistency between backend state and real-world machine behavior.

Primary goals:

- reliability in production
- smooth UX on both iOS and Android
- maintainable and scalable code

Constraints:

- mobile performance is critical
- must work on [iOS version]+ and [Android version]+
- network conditions may be unreliable

Key priorities:

- avoid crashes and regressions
- ensure consistent behavior across platforms
- optimize perceived performance (loading states, responsiveness)
