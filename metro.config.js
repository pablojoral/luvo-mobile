// metro.config.js
const fs = require('fs');
const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Exclude SVGs from the asset pipeline and treat them as source files instead
const { assetExts, sourceExts } = defaultConfig.resolver;

// Local development: when luvo-ui is checked out as a sibling and linked via
// `link:../luvo-ui` in package.json, Metro needs extra configuration to watch
// the directory and prevent duplicate singleton instances from luvo-ui's own
// node_modules. This block is a no-op when installing from GitHub normally.
const luvoUiPath = path.resolve(__dirname, '../luvo-ui');
const isLuvoUiLinked = fs.existsSync(luvoUiPath);

// Packages that must exist as a single instance in the bundle.
// When luvo-ui is linked locally, Metro's hierarchical lookup would find
// these inside luvo-ui/node_modules first. We redirect them to always
// resolve from the app's node_modules instead.
const SINGLETONS = [
  'react',
  'react-native',
  '@react-navigation/native',
  'react-native-reanimated',
  'react-native-safe-area-context',
  'react-native-screens',
  'react-native-svg',
];

const config = {
  ...(isLuvoUiLinked && { watchFolders: [luvoUiPath] }),
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    nodeModulesPaths: [path.resolve(__dirname, 'node_modules')],
    ...(isLuvoUiLinked && {
      resolveRequest: (context, moduleName, platform) => {
        const isSingleton = SINGLETONS.some(
          s => moduleName === s || moduleName.startsWith(`${s}/`),
        );
        if (isSingleton) {
          return context.resolveRequest(
            { ...context, originModulePath: path.join(__dirname, 'index.js') },
            moduleName,
            platform,
          );
        }
        return context.resolveRequest(context, moduleName, platform);
      },
    }),
  },
};

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
module.exports = mergeConfig(defaultConfig, config);
