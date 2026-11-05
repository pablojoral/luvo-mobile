import { registerRootComponent } from 'expo';
import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import App from './App';

// Must be registered before the root component — runs when app is in background/quit
setBackgroundMessageHandler(getMessaging(), async (_message) => {});

registerRootComponent(App);
