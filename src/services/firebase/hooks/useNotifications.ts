import { useEffect, useRef } from 'react';

import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { navigationRef } from '../../../navigation/navigationRef';
import { RootStackParamList } from '../../../navigation/RootStackNavigator';
import { useMessagesStore } from '../../../stores/useMessagesStore';
import { useFirebaseAuthState } from '../../../query/Auth/useAuth';
import { logger } from 'services/logger';
import { notificationsService } from '../../api/services/NotificationsService';
import {
  checkNotificationPermission,
  getFCMToken,
  getInitialNotificationMessage,
  onForegroundMessage,
  onNotificationOpenedAppListener,
  onTokenRefreshListener,
  PermissionStatus,
  requestNotificationPermission,
} from '../../notifications/notifications';

function navigateFromNotification(data: Record<string, string> | undefined) {
  if (!data?.screen || !navigationRef.isReady()) return;

  const screen = data.screen as keyof RootStackParamList;
  switch (screen) {
    case 'MachineDetails':
      if (data.machineId) {
        navigationRef.navigate('MachineDetails', { machineId: Number(data.machineId) });
      }
      break;
    case 'LaundryDetails':
      if (data.laundryId) {
        navigationRef.navigate('LaundryDetails', { laundryId: Number(data.laundryId) });
      }
      break;
    case 'History':
      navigationRef.navigate('History');
      break;
  }
}

export function useNotifications() {
  const { data: firebaseUser } = useFirebaseAuthState();
  const addMessage = useMessagesStore(s => s.addMessage);
  const initialized = useRef(false);

  useEffect(() => {
    if (!firebaseUser || initialized.current) return;
    initialized.current = true;

    async function initialize() {
      let status: PermissionStatus = await checkNotificationPermission();

      if (status === 'not_determined') {
        status = await requestNotificationPermission();
      }

      if (status !== 'granted') return;

      const token = await getFCMToken();
      if (token) {
        logger.debug('Notifications', 'FCM token obtained', token);
        notificationsService.registerToken(token).catch(err => {
          logger.error('Notifications', 'failed to register FCM token', err);
        });
      }

      // App launched by tapping a notification (quit state)
      const initial = await getInitialNotificationMessage();
      if (initial?.notification) {
        addMessage({
          title: initial.notification.title,
          body: initial.notification.body ?? '',
        });
        navigateFromNotification(initial.data as Record<string, string>);
      }
    }

    initialize();

    // Foreground: show toast only, don't auto-navigate
    const unsubForeground = onForegroundMessage(message => {
      if (!message.notification?.body) return;
      addMessage({
        title: message.notification.title,
        body: message.notification.body,
      });
    });

    // Background tap: navigate + show toast
    const unsubOpened = onNotificationOpenedAppListener(
      (message: FirebaseMessagingTypes.RemoteMessage) => {
        if (message.notification?.body) {
          addMessage({
            title: message.notification.title,
            body: message.notification.body,
          });
        }
        navigateFromNotification(message.data as Record<string, string>);
      },
    );

    // Token refresh — re-register with server
    const unsubRefresh = onTokenRefreshListener(newToken => {
      notificationsService.registerToken(newToken).catch(err => {
        logger.error('Notifications', 'failed to re-register refreshed FCM token', err);
      });
    });

    return () => {
      unsubForeground();
      unsubOpened();
      unsubRefresh();
    };
  }, [firebaseUser, addMessage]);
}
