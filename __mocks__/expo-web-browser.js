module.exports = {
  openBrowserAsync: jest.fn().mockResolvedValue({ type: 'cancel' }),
  dismissBrowser: jest.fn(),
};
