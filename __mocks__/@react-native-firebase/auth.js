/**
 * Manual mock for @react-native-firebase/auth.
 *
 * Exports both the legacy default-call shape (`auth()`) and the modular
 * named exports (`getAuth`, `onAuthStateChanged`, etc.) that useAuth.ts
 * imports via the Firebase v9 modular API.
 *
 * Contract:
 *   const mockAuth = require('@react-native-firebase/auth');
 *   mockAuth().onAuthStateChanged  — the jest.fn() tests configure
 *   mockAuth.getAuth()             — returns the same shared instance
 *   mockAuth.onAuthStateChanged    — delegates to the shared instance fn
 */

const sharedAuthInstance = {
  currentUser: null,
  signOut: jest.fn().mockResolvedValue(undefined),
  onAuthStateChanged: jest.fn(callback => {
    callback(null);
    return jest.fn(); // unsubscribe
  }),
  signInWithEmailAndPassword: jest.fn().mockResolvedValue({ user: null }),
  createUserWithEmailAndPassword: jest.fn().mockResolvedValue({ user: null }),
  EmailAuthProvider: {
    credential: jest.fn(),
  },
};

// Legacy callable shape: auth() → instance
const auth = jest.fn(() => sharedAuthInstance);

// Re-expose EmailAuthProvider on the callable so namespace-style usage
// (auth.EmailAuthProvider.credential(...)) resolves correctly.
auth.EmailAuthProvider = sharedAuthInstance.EmailAuthProvider;

// Named modular exports (Firebase v9 modular API)
auth.getAuth = jest.fn(() => sharedAuthInstance);

// onAuthStateChanged modular export: takes (auth, callback) and delegates to
// the shared instance's onAuthStateChanged so test-side mockImplementation
// on mockAuth().onAuthStateChanged reaches the production code path.
auth.onAuthStateChanged = jest.fn((_authArg, cb) =>
  sharedAuthInstance.onAuthStateChanged(cb),
);

auth.signInWithEmailAndPassword = jest.fn((_auth, email, password) =>
  sharedAuthInstance.signInWithEmailAndPassword(email, password),
);
auth.createUserWithEmailAndPassword = jest.fn((_auth, email, password) =>
  sharedAuthInstance.createUserWithEmailAndPassword(email, password),
);
auth.signOut = jest.fn((_auth) => sharedAuthInstance.signOut());
auth.sendPasswordResetEmail = jest.fn().mockResolvedValue(undefined);

// FirebaseAuthTypes namespace expected by production code type imports
auth.FirebaseAuthTypes = {};

module.exports = auth;
module.exports.default = auth;
