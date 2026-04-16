module.exports = {
  root: true,
  extends: '@react-native',
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
      rules: {
        'testing-library/prefer-screen-queries': 'off',
      },
    },
  ],
};
