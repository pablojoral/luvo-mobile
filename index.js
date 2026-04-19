/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';

// Must be registered before AppRegistry — runs when app is in background/quit
messaging().setBackgroundMessageHandler(async (_message) => {
  // Background messages are shown automatically by the OS using the notification
  // payload. No action needed here unless you want to update local state/badges.
});

AppRegistry.registerComponent(appName, () => App);
