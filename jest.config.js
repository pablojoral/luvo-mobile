module.exports = {
  preset: 'react-native',
  // setupFiles runs before the test framework is installed.
  // Only put mocks here that must intercept at module-evaluation time
  // (e.g. AsyncStorage, which Zustand reads when its store module is first imported).
  setupFiles: ['<rootDir>/jest.setup.ts'],
  // setupFilesAfterEnv runs after the framework is installed and after per-test
  // jest.mock() hoisting is in place — safe for i18n bootstrap and navigation stubs.
  setupFilesAfterEnv: ['<rootDir>/jest.setup-after-env.ts'],
  moduleNameMapper: {
    // Manual reanimated mock avoids react-native-worklets ESM parse error
    '^react-native-reanimated$': '<rootDir>/__mocks__/react-native-reanimated.js',
    // @rnmapbox/maps throws at import time without native linking
    '^@rnmapbox/maps$': '<rootDir>/__mocks__/@rnmapbox/maps.js',
    // @react-native-firebase/auth chains into firebase/app (ESM) — mock it entirely
    '^@react-native-firebase/auth$': '<rootDir>/__mocks__/@react-native-firebase/auth.js',
    // @react-native-firebase/messaging requires the native RNFBAppModule — mock it entirely
    '^@react-native-firebase/messaging$': '<rootDir>/__mocks__/@react-native-firebase/messaging.js',
    // react-native-localize wraps a TurboModule — mock it entirely in Jest
    '^react-native-localize$': '<rootDir>/__mocks__/react-native-localize.js',
    // react-native-safe-area-context requires native values — mock with zero insets
    '^react-native-safe-area-context$': '<rootDir>/__mocks__/react-native-safe-area-context.js',
    // react-native-config is a native module with no JS fallback
    '^react-native-config$': '<rootDir>/__mocks__/react-native-config.js',
    // react-native-gesture-handler native setup chain breaks in Jest (root + sub-paths)
    '^react-native-gesture-handler$': '<rootDir>/__mocks__/react-native-gesture-handler.js',
    '^react-native-gesture-handler/(.*)$': '<rootDir>/__mocks__/react-native-gesture-handler.js',
    // react-native-vision-camera requires native Camera module
    '^react-native-vision-camera$': '<rootDir>/__mocks__/react-native-vision-camera.js',
    // @react-native-community/netinfo requires native module at init time
    '^@react-native-community/netinfo$': '<rootDir>/__mocks__/@react-native-community/netinfo.js',
    // react-native-inappbrowser-reborn: utils.js reads NativeModules.RNInAppBrowser
    // and AppState.currentState at module scope — cannot safely transform; stub entirely.
    '^react-native-inappbrowser-reborn$': '<rootDir>/__mocks__/react-native-inappbrowser-reborn.js',
    // @luvo/ui is a file: dep that bundles RN components — mock entirely in Jest
    '^@luvo/ui$': '<rootDir>/__mocks__/@luvo/ui.js',
    // Paths not covered by babel-plugin-module-resolver (root: ./src)
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^stores/(.*)$': '<rootDir>/src/stores/$1',
    '^query/(.*)$': '<rootDir>/src/query/$1',
    '^navigation/(.*)$': '<rootDir>/src/navigation/$1',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/.claude/',
  ],
  // Exclude the Claude Code worktrees directory from haste-map scanning so
  // it does not register duplicate manual mocks or stale test suites.
  modulePathIgnorePatterns: [
    '<rootDir>/.claude/',
  ],
  transformIgnorePatterns: [
    // react-native-qrcode-svg: pure JS (JSX + react-native-svg only, no NativeModules
    // or TurboModuleRegistry at import time) — must be Babel-transformed for JSX.
    'node_modules/(?!(react-native|@react-native/.*|@react-native-firebase|@react-native-community|@rnmapbox|react-native-vision-camera|react-native-safe-area-context|react-native-screens|@react-navigation|firebase|@firebase|react-native-vector-icons|react-native-qrcode-svg)/)',
  ],
};
