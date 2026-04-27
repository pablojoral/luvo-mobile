// Bootstrap i18next with the full resource bundle so useTranslation resolves
// keys in component tests (e.g. AvailabilityTag). Without this, tests that
// render translated components receive raw key strings instead of labels.
//
// Runs in setupFilesAfterFramework (setupFilesAfterEnv) so that any per-test
// jest.mock() hoisting is already in place before i18n initialises — avoids
// a fragile ordering where the singleton bootstraps before mocks are applied.
require('services/i18n');

// Stub useNavigation so component tests that render navigating components
// don't require a NavigationContainer wrapper. Tests that need real navigation
// behaviour should provide their own mock or wrapper.
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: jest.fn(() => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      reset: jest.fn(),
      setOptions: jest.fn(),
      addListener: jest.fn(() => jest.fn()),
      removeListener: jest.fn(),
      canGoBack: jest.fn(() => false),
      dispatch: jest.fn(),
      isFocused: jest.fn(() => true),
    })),
    useRoute: jest.fn(() => ({ params: {}, name: 'MockRoute', key: 'mock-key' })),
    useFocusEffect: jest.fn(cb => cb()),
    useIsFocused: jest.fn(() => true),
  };
});
