import {
  getMessaging,
  getToken,
  requestPermission,
  hasPermission,
  onMessage,
  onTokenRefresh,
  onNotificationOpenedApp,
  getInitialNotification,
  AuthorizationStatus,
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export type PermissionStatus = 'granted' | 'denied' | 'not_determined';

export async function requestNotificationPermission(): Promise<PermissionStatus> {
  if (Platform.OS === 'android' && Platform.Version < 33) {
    return 'granted';
  }

  const status = await requestPermission(getMessaging());

  switch (status) {
    case AuthorizationStatus.AUTHORIZED:
    case AuthorizationStatus.PROVISIONAL:
      return 'granted';
    case AuthorizationStatus.DENIED:
      return 'denied';
    default:
      return 'not_determined';
  }
}

export async function checkNotificationPermission(): Promise<PermissionStatus> {
  const status = await hasPermission(getMessaging());

  switch (status) {
    case AuthorizationStatus.AUTHORIZED:
    case AuthorizationStatus.PROVISIONAL:
      return 'granted';
    case AuthorizationStatus.DENIED:
      return 'denied';
    default:
      return 'not_determined';
  }
}

export async function getFCMToken(): Promise<string | null> {
  try {
    return await getToken(getMessaging());
  } catch {
    return null;
  }
}

export function onForegroundMessage(
  handler: (message: FirebaseMessagingTypes.RemoteMessage) => void,
): () => void {
  return onMessage(getMessaging(), handler);
}

export function onTokenRefreshListener(handler: (token: string) => void): () => void {
  return onTokenRefresh(getMessaging(), handler);
}

export function onNotificationOpenedAppListener(
  handler: (message: FirebaseMessagingTypes.RemoteMessage) => void,
): () => void {
  return onNotificationOpenedApp(getMessaging(), handler);
}

export async function getInitialNotificationMessage(): Promise<FirebaseMessagingTypes.RemoteMessage | null> {
  return getInitialNotification(getMessaging());
}
