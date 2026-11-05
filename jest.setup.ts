// AsyncStorage must be mocked in setupFiles (before the framework loads) so
// the mock intercepts before Zustand store evaluation, which happens at module
// import time and can trigger AsyncStorage reads.
jest.mock(
  '@react-native-async-storage/async-storage',
  () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Expo's stream polyfill makes axios's fetch-adapter feature probe throw at import
// ("Cannot cancel a stream that already has a reader"). apiClient pins the XHR adapter,
// so hiding ReadableStream just makes axios skip that probe.
delete (globalThis as any).ReadableStream;
