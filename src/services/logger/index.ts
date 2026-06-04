import { logger } from './logger';
import { consolePlugin } from './plugins/consolePlugin';

if (__DEV__) {
  logger.addPlugin(consolePlugin);
}

export { logger };
export type { LogLevel, LogPlugin } from './logger';
export { consolePlugin };
