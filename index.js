/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';
import { logger, consolePlugin, crashlyticsPlugin } from 'services/logger';
import App from './App';
import { name as appName } from './app.json';

if (__DEV__) {
  logger.addPlugin(consolePlugin);
  crashlytics().setCrashlyticsCollectionEnabled(false);
} else {
  logger.addPlugin(crashlyticsPlugin);
}

// Must be registered before AppRegistry — runs when app is in background/quit
setBackgroundMessageHandler(getMessaging(), async message => {
  logger.debug('Notifications', 'background message received', message.notification?.title ?? '');
});

AppRegistry.registerComponent(appName, () => App);
