export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogPlugin {
  log(level: LogLevel, tag: string, message: string, meta?: unknown): void;
}

class Logger {
  private plugins: LogPlugin[] = [];

  addPlugin(plugin: LogPlugin): void {
    this.plugins.push(plugin);
  }

  debug(tag: string, message: string, meta?: unknown): void {
    this._emit('debug', tag, message, meta);
  }

  info(tag: string, message: string, meta?: unknown): void {
    this._emit('info', tag, message, meta);
  }

  warn(tag: string, message: string, meta?: unknown): void {
    this._emit('warn', tag, message, meta);
  }

  error(tag: string, message: string, meta?: unknown): void {
    this._emit('error', tag, message, meta);
  }

  private _emit(level: LogLevel, tag: string, message: string, meta?: unknown): void {
    for (const plugin of this.plugins) {
      plugin.log(level, tag, message, meta);
    }
  }
}

export const logger = new Logger();
