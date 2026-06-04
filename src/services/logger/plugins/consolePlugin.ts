import type { LogPlugin, LogLevel } from '../logger';

const CONSOLE_FN: Record<LogLevel, (...args: unknown[]) => void> = {
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error,
};

export const consolePlugin: LogPlugin = {
  log(level, tag, message, meta) {
    const fn = CONSOLE_FN[level];
    meta !== undefined ? fn(`[${tag}]`, message, meta) : fn(`[${tag}]`, message);
  },
};
