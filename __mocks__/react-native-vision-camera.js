module.exports = {
  Camera: 'Camera',
  useCameraDevice: jest.fn(() => null),
  useCameraPermission: jest.fn(() => ({ hasPermission: false, requestPermission: jest.fn() })),
  useCodeScanner: jest.fn(() => ({})),
  useCameraFormat: jest.fn(() => null),
  useMicrophonePermission: jest.fn(() => ({ hasPermission: false, requestPermission: jest.fn() })),
};
