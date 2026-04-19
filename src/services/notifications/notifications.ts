import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export type PermissionStatus = 'granted' | 'denied' | 'not_determined';

export async function requestNotificationPermission(): Promise<PermissionStatus> {
  if (Platform.OS === 'android' && Platform.Version < 33) {
    // Android < 13 grants permission automatically
    return 'granted';
  }

  const status = await messaging().requestPermission();

  switch (status) {
    case messaging.AuthorizationStatus.AUTHORIZED:
    case messaging.AuthorizationStatus.PROVISIONAL:
      return 'granted';
    case messaging.AuthorizationStatus.DENIED:
      return 'denied';
    default:
      return 'not_determined';
  }
}

export async function checkNotificationPermission(): Promise<PermissionStatus> {
  const status = await messaging().hasPermission();

  switch (status) {
    case messaging.AuthorizationStatus.AUTHORIZED:
    case messaging.AuthorizationStatus.PROVISIONAL:
      return 'granted';
    case messaging.AuthorizationStatus.DENIED:
      return 'denied';
    default:
      return 'not_determined';
  }
}

export async function getFCMToken(): Promise<string | null> {
  try {
    return await messaging().getToken();
  } catch {
    return null;
  }
}

export function onForegroundMessage(
  handler: (message: FirebaseMessagingTypes.RemoteMessage) => void,
): () => void {
  return messaging().onMessage(handler);
}

export function onTokenRefresh(handler: (token: string) => void): () => void {
  return messaging().onTokenRefresh(handler);
}

export function onNotificationOpenedApp(
  handler: (message: FirebaseMessagingTypes.RemoteMessage) => void,
): () => void {
  return messaging().onNotificationOpenedApp(handler);
}

export async function getInitialNotification(): Promise<FirebaseMessagingTypes.RemoteMessage | null> {
  return messaging().getInitialNotification();
}
