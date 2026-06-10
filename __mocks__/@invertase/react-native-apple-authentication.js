const appleAuth = {
  performRequest: jest.fn().mockResolvedValue({ identityToken: 'mock-token', nonce: 'mock-nonce' }),
  Operation: { LOGIN: 'LOGIN' },
  Scope: { FULL_NAME: 'FULL_NAME', EMAIL: 'EMAIL' },
};

module.exports = { appleAuth, default: appleAuth };
