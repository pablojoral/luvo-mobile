import { useEffect, useRef } from 'react';

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
import { useMessagesStore } from '../../../stores/useMessagesStore';
import { useFirebaseAuthState } from '../../../query/Auth/useAuth';

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
      console.log('FCM Token:', token);
      if (token) {
        notificationsService.registerToken(token).catch(() => {});
      }

      // Handle notification that opened the app from quit/background state
      const initial = await getInitialNotificationMessage();
      if (initial?.notification) {
        addMessage({
          title: initial.notification.title,
          body: initial.notification.body ?? '',
        });
      }
    }

    initialize();

    // Foreground messages
    const unsubForeground = onForegroundMessage(message => {
      if (!message.notification?.body) return;
      addMessage({
        title: message.notification.title,
        body: message.notification.body,
      });
    });

    // App opened from background tap
    const unsubOpened = onNotificationOpenedAppListener(message => {
      if (!message.notification?.body) return;
      addMessage({
        title: message.notification.title,
        body: message.notification.body,
      });
    });

    // Token refresh — re-register with server
    const unsubRefresh = onTokenRefreshListener(newToken => {
      notificationsService.registerToken(newToken).catch(() => {});
    });

    return () => {
      unsubForeground();
      unsubOpened();
      unsubRefresh();
    };
  }, [firebaseUser, addMessage]);
}
