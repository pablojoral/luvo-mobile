/**
 * Manual mock for @react-native-firebase/auth.
 * Prevents loading the Firebase JS SDK (ESM) in Jest.
 */
const auth = () => ({
  currentUser: null,
  signOut: jest.fn().mockResolvedValue(undefined),
  onAuthStateChanged: jest.fn(callback => {
    callback(null);
    return jest.fn(); // unsubscribe
  }),
  signInWithEmailAndPassword: jest.fn().mockResolvedValue({ user: null }),
  createUserWithEmailAndPassword: jest.fn().mockResolvedValue({ user: null }),
});

auth.EmailAuthProvider = {
  credential: jest.fn(),
};

module.exports = auth;
module.exports.default = auth;
