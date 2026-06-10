import {
  AppleAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from '@react-native-firebase/auth';
import appleAuth from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '333933437173-87sbp485dst4tsd9fb917lc7rsju5p6j.apps.googleusercontent.com',
});

// Email/Password
export async function signUpWithEmail(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(getAuth(), email, password);
  return cred.user;
}

export async function signInWithEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(getAuth(), email, password);
  return cred.user;
}

export function signOut() {
  return firebaseSignOut(getAuth());
}

export async function signInWithGoogle() {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const result = await GoogleSignin.signIn();
  const idToken = result.data?.idToken;
  if (!idToken) throw new Error('Google sign-in failed: no ID token');
  const credential = GoogleAuthProvider.credential(idToken);
  return signInWithCredential(getAuth(), credential);
}

export async function signInWithApple() {
  const response = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });
  if (!response.identityToken) throw new Error('Apple sign-in failed: no identity token');
  const credential = AppleAuthProvider.credential(response.identityToken, response.nonce);
  return signInWithCredential(getAuth(), credential);
}

export async function linkWithGoogle() {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const result = await GoogleSignin.signIn();
  const idToken = result.data?.idToken;
  if (!idToken) throw new Error('Google sign-in failed: no ID token');
  const credential = GoogleAuthProvider.credential(idToken);
  const user = getAuth().currentUser;
  if (!user) throw new Error('No authenticated user');
  return user.linkWithCredential(credential);
}

export async function linkWithApple() {
  const response = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });
  if (!response.identityToken) throw new Error('Apple sign-in failed: no identity token');
  const credential = AppleAuthProvider.credential(response.identityToken, response.nonce);
  const user = getAuth().currentUser;
  if (!user) throw new Error('No authenticated user');
  return user.linkWithCredential(credential);
}

export async function unlinkProvider(providerId: string) {
  const user = getAuth().currentUser;
  if (!user) throw new Error('No authenticated user');
  return user.unlink(providerId);
}

export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(getAuth(), email);
}

export async function deleteCurrentUser(): Promise<void> {
  const user = getAuth().currentUser;
  if (!user) throw new Error('No authenticated user');
  await user.delete();
}

export function getLinkedProviders() {
  return getAuth().currentUser?.providerData ?? [];
}

// Get fresh Firebase ID token (to call your Fastify API)
export async function getIdToken(forceRefresh = false) {
  const current = getAuth().currentUser;
  if (!current) return null;
  return current.getIdToken(forceRefresh);
}
