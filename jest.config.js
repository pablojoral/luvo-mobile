module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    // Manual reanimated mock avoids react-native-worklets ESM parse error
    '^react-native-reanimated$': '<rootDir>/__mocks__/react-native-reanimated.js',
    // @rnmapbox/maps throws at import time without native linking
    '^@rnmapbox/maps$': '<rootDir>/__mocks__/@rnmapbox/maps.js',
    // @react-native-firebase/auth chains into firebase/app (ESM) — mock it entirely
    '^@react-native-firebase/auth$': '<rootDir>/__mocks__/@react-native-firebase/auth.js',
    // react-native-config is a native module with no JS fallback
    '^react-native-config$': '<rootDir>/__mocks__/react-native-config.js',
    // react-native-gesture-handler native setup chain breaks in Jest
    '^react-native-gesture-handler$': '<rootDir>/__mocks__/react-native-gesture-handler.js',
    // react-native-vision-camera requires native Camera module
    '^react-native-vision-camera$': '<rootDir>/__mocks__/react-native-vision-camera.js',
    // @react-native-community/netinfo requires native module at init time
    '^@react-native-community/netinfo$': '<rootDir>/__mocks__/@react-native-community/netinfo.js',
    // Paths not covered by babel-plugin-module-resolver (root: ./src)
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^stores/(.*)$': '<rootDir>/src/stores/$1',
    '^query/(.*)$': '<rootDir>/src/query/$1',
    '^navigation/(.*)$': '<rootDir>/src/navigation/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native/.*|@react-native-firebase|@react-native-community|@rnmapbox|react-native-vision-camera|react-native-safe-area-context|react-native-screens|@react-navigation|firebase|@firebase|react-native-vector-icons)/)',
  ],
};
