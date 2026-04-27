// AsyncStorage must be mocked in setupFiles (before the framework loads) so
// the mock intercepts before Zustand store evaluation, which happens at module
// import time and can trigger AsyncStorage reads.
jest.mock(
  '@react-native-async-storage/async-storage',
  () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
