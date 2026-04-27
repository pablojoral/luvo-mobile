/**
 * Manual mock for @react-native-firebase/messaging.
 * Prevents loading the Firebase native RNFBAppModule at import time in Jest.
 */

const AuthorizationStatus = {
  NOT_DETERMINED: -1,
  DENIED: 0,
  AUTHORIZED: 1,
  PROVISIONAL: 2,
  EPHEMERAL: 3,
};

const sharedMessagingInstance = {
  getToken: jest.fn().mockResolvedValue('mock-fcm-token'),
  onMessage: jest.fn(() => jest.fn()), // returns unsubscribe fn
  onTokenRefresh: jest.fn(() => jest.fn()),
  onNotificationOpenedApp: jest.fn(() => jest.fn()),
  getInitialNotification: jest.fn().mockResolvedValue(null),
  requestPermission: jest.fn().mockResolvedValue(AuthorizationStatus.AUTHORIZED),
  hasPermission: jest.fn().mockResolvedValue(AuthorizationStatus.AUTHORIZED),
  AuthorizationStatus,
};

// Legacy callable shape: messaging() → instance
const messaging = jest.fn(() => sharedMessagingInstance);

// Modular named exports (Firebase v9 modular API)
messaging.getMessaging = jest.fn(() => sharedMessagingInstance);
messaging.getToken = jest.fn((_messaging, _options) =>
  sharedMessagingInstance.getToken(),
);
messaging.onMessage = jest.fn((_messaging, cb) =>
  sharedMessagingInstance.onMessage(cb),
);
messaging.onTokenRefresh = jest.fn((_messaging, cb) =>
  sharedMessagingInstance.onTokenRefresh(cb),
);
messaging.onNotificationOpenedApp = jest.fn((_messaging, cb) =>
  sharedMessagingInstance.onNotificationOpenedApp(cb),
);
messaging.getInitialNotification = jest.fn((_messaging) =>
  sharedMessagingInstance.getInitialNotification(),
);
messaging.requestPermission = jest.fn((_messaging, _settings) =>
  sharedMessagingInstance.requestPermission(),
);
messaging.hasPermission = jest.fn((_messaging) =>
  sharedMessagingInstance.hasPermission(),
);
messaging.AuthorizationStatus = AuthorizationStatus;

// FirebaseMessagingTypes namespace
messaging.FirebaseMessagingTypes = { AuthorizationStatus };

module.exports = messaging;
module.exports.default = messaging;
