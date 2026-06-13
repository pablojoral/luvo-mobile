import crashlytics from '@react-native-firebase/crashlytics';

import type { LogPlugin } from '../logger';

export const crashlyticsPlugin: LogPlugin = {
  log(level, tag, message, meta) {
    crashlytics().log(`[${tag}] ${message}`);

    if (level === 'error') {
      const error = meta instanceof Error ? meta : new Error(`${message}${meta !== undefined ? ` — ${JSON.stringify(meta)}` : ''}`);
      crashlytics().recordError(error, `${tag}: ${message}`);
    }
  },
};
