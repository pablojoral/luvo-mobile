// metro.config.js
const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Exclude SVGs from the asset pipeline and treat them as source files instead
const { assetExts, sourceExts } = defaultConfig.resolver;

const luvoUiPath = path.resolve(__dirname, '../luvo-ui');

const config = {
  // Watch luvo-ui source so Metro hot-reloads when package source changes
  watchFolders: [luvoUiPath],
  transformer: {
    // Use the SVG transformer
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    // Ensure shared deps (react, react-native) resolve from the app's
    // node_modules rather than the package's, preventing duplicate instances.
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(luvoUiPath, 'node_modules'),
    ],
  },
};

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
module.exports = mergeConfig(defaultConfig, config);
