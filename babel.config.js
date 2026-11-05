module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
          alias: {
            components: './src/components',
            features: './src/features',
            services: './src/services',
            theme: './src/theme',
            utils: './src/utils',
          },
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};
