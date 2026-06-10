/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import { logger, consolePlugin } from 'services/logger';
import App from './App';
import { name as appName } from './app.json';

if (__DEV__) {
  logger.addPlugin(consolePlugin);
}

// Must be registered before AppRegistry — runs when app is in background/quit
setBackgroundMessageHandler(getMessaging(), async (_message) => {});

AppRegistry.registerComponent(appName, () => App);
