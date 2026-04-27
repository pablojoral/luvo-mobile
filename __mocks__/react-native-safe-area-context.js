/**
 * Manual mock for react-native-safe-area-context.
 *
 * Creates the same context objects that the real module exports so that
 * @react-navigation/elements' SafeAreaProviderCompat can call useContext()
 * without receiving undefined. The SafeAreaProvider wraps children in these
 * real context providers, providing zero-inset values for test rendering.
 */
const React = require('react');

const MOCK_INSETS = { top: 0, right: 0, bottom: 0, left: 0 };
const MOCK_FRAME = { x: 0, y: 0, width: 375, height: 812 };
const MOCK_METRICS = { insets: MOCK_INSETS, frame: MOCK_FRAME };

// Recreate the context objects — these must be singletons in module scope
// so every useContext(SafeAreaInsetsContext) call across the app and navigation
// libraries gets the same context reference.
const SafeAreaInsetsContext = React.createContext(MOCK_INSETS);
SafeAreaInsetsContext.displayName = 'SafeAreaInsetsContext';

const SafeAreaFrameContext = React.createContext(MOCK_FRAME);
SafeAreaFrameContext.displayName = 'SafeAreaFrameContext';

function SafeAreaProvider({ children, initialMetrics }) {
  const insetsValue = (initialMetrics && initialMetrics.insets) || MOCK_INSETS;
  const frameValue = (initialMetrics && initialMetrics.frame) || MOCK_FRAME;
  return React.createElement(
    SafeAreaFrameContext.Provider,
    { value: frameValue },
    React.createElement(
      SafeAreaInsetsContext.Provider,
      { value: insetsValue },
      children,
    ),
  );
}

function SafeAreaView({ children, style }) {
  const { View } = require('react-native');
  return React.createElement(View, { style }, children);
}

module.exports = {
  SafeAreaInsetsContext,
  SafeAreaFrameContext,
  SafeAreaProvider,
  SafeAreaView,
  SafeAreaConsumer: SafeAreaInsetsContext.Consumer,
  initialWindowMetrics: MOCK_METRICS,
  // Return the constant directly — calling useContext inside a jest.fn factory
  // throws "Invalid hook call" when the fn is invoked outside a component.
  useSafeAreaInsets: jest.fn(() => MOCK_INSETS),
  useSafeAreaFrame: jest.fn(() => MOCK_FRAME),
  withSafeAreaInsets: function (WrappedComponent) { return WrappedComponent; },
};
