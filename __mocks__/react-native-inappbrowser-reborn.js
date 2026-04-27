/**
 * Manual mock for react-native-inappbrowser-reborn.
 *
 * utils.js reads NativeModules.RNInAppBrowser and AppState.currentState at
 * module scope, so this package cannot be Babel-transformed in Jest —
 * the native references resolve to undefined and the module-level side-effects
 * throw or break. Mock it entirely instead of allowing transform.
 */

const InAppBrowser = {
  open: jest.fn().mockResolvedValue({ type: 'cancel' }),
  openAuth: jest.fn().mockResolvedValue({ type: 'cancel' }),
  close: jest.fn(),
  closeAuth: jest.fn(),
  isAvailable: jest.fn().mockResolvedValue(false),
  warmup: jest.fn().mockResolvedValue(false),
  mayLaunchUrl: jest.fn(),
};

module.exports = { InAppBrowser };
module.exports.default = InAppBrowser;
