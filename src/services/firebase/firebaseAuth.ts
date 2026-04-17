import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import appleAuth from '@invertase/react-native-apple-authentication';

// Email/Password
export async function signUpWithEmail(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(getAuth(), email, password);
  // optionally update profile:
  // await cred.user.updateProfile({ displayName: '...' });
  return cred.user;
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const cred = await signInWithEmailAndPassword(getAuth(), email, password);
    return cred.user;
  } catch (error) {
    throw error;
  }
}

export function signOut() {
  return firebaseSignOut(getAuth());
}

export async function signInWithGoogle() {
  // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // const { data } = await GoogleSignin.signIn();
  // const credential = auth.GoogleAuthProvider.credential(data?.idToken);
  // return auth().signInWithCredential(credential);
}

export async function signInWithApple() {
  // const appleAuthResponse = await appleAuth.performRequest({
  //   requestedOperation: appleAuth.Operation.LOGIN,
  //   requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  // });
  // if (!appleAuthResponse.identityToken) throw new Error('Apple sign-in failed: no identity token');
  // const credential = auth.AppleAuthProvider.credential(
  //   appleAuthResponse.identityToken,
  //   appleAuthResponse.nonce,
  // );
  // return auth().signInWithCredential(credential);
}

// Get fresh Firebase ID token (to call your Fastify API)
export async function getIdToken(forceRefresh = false) {
  const current = getAuth().currentUser;
  if (!current) return null;
  return current.getIdToken(forceRefresh);
}
