const crashlytics = () => ({
  log: jest.fn(),
  recordError: jest.fn(),
  setCrashlyticsCollectionEnabled: jest.fn(),
  setUserId: jest.fn(),
  setAttribute: jest.fn(),
});

module.exports = crashlytics;
module.exports.default = crashlytics;
