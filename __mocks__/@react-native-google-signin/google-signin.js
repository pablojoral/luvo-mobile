const GoogleSignin = {
  configure: jest.fn(),
  hasPlayServices: jest.fn().mockResolvedValue(true),
  signIn: jest.fn().mockResolvedValue({ data: { idToken: 'mock-id-token' } }),
};

module.exports = { GoogleSignin };
