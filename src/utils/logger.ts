/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { LogLevel } from '../types/logger';

const LogColors = {
  [LogLevel.INFO]: 'color: blue',
  [LogLevel.WARN]: 'color: orange',
  [LogLevel.ERROR]: 'color: red',
  [LogLevel.DEBUG]: 'color: green',
};

class Logger {
  private static timers: Record<string, number> = {};

  private static log(
    level: LogLevel,
    message: string,
    ...optionalParams: any[]
  ) {
    const timestamp = new Date().toISOString();
    const color = LogColors[level];
    switch (level) {
      case LogLevel.INFO:
        console.info(
          `%c[${timestamp}] [${level}]: ${message}`,
          color,
          ...optionalParams,
        );
        break;
      case LogLevel.WARN:
        console.warn(
          `%c[${timestamp}] [${level}]: ${message}`,
          color,
          ...optionalParams,
        );
        break;
      case LogLevel.ERROR:
        console.error(
          `%c[${timestamp}] [${level}]: ${message}`,
          color,
          ...optionalParams,
        );
        break;
      case LogLevel.DEBUG:
        console.debug(
          `%c[${timestamp}] [${level}]: ${message}`,
          color,
          ...optionalParams,
        );
        break;
      default:
        console.log(`%c[${timestamp}]: ${message}`, color, ...optionalParams);
        break;
    }
  }

  static info(message: string, ...optionalParams: any[]) {
    this.log(LogLevel.INFO, message, ...optionalParams);
  }

  static warn(message: string, ...optionalParams: any[]) {
    this.log(LogLevel.WARN, message, ...optionalParams);
  }

  static error(message: string, ...optionalParams: any[]) {
    this.log(LogLevel.ERROR, message, ...optionalParams);
  }

  static debug(message: string, ...optionalParams: any[]) {
    this.log(LogLevel.DEBUG, message, ...optionalParams);
  }

  static timeStart(label: string) {
    this.timers[label] = performance.now();
    this.log(LogLevel.INFO, `Timer started for ${label}`);
  }

  static timeEnd(label: string) {
    const endTime = performance.now();
    const startTime = this.timers[label];

    if (startTime !== undefined) {
      const duration = endTime - startTime;
      this.log(
        LogLevel.INFO,
        `Timer ended for ${label}: ${duration.toFixed(2)} ms`,
      );
      delete this.timers[label];
    }
  }
}

export default Logger;
