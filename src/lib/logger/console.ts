import { Logger, LogLevel } from './logger';
import chalk from 'chalk';

interface LogOptions {
  message: string;
  data: any;
  level: LogLevel;
  method?: LogMethod;
}

enum LogMethod {
  log = 'log',
  info = 'info',
  warn = 'warn',
  error = 'error',
}

export interface LogClient {
  log: (...data: any) => void;
  info: (...data: any) => void;
  warn: (...data: any) => void;
  error: (...data: any) => void;
}

export class ConsoleLogger implements Logger {
  private defaultLogMethod: LogMethod = LogMethod.log;

  constructor(
    private name: string,
    private level: LogLevel,
    private client: LogClient = console,
  ) {
    if (!level && level !== 0) {
      this.level = LogLevel.info;
    }
  }

  private log({ message, level, method, data }: LogOptions): void {
    const loggable = this.level !== 0 && level >= this.level;

    if (!loggable) return;

    const messageColors = {
      0: chalk.grey,
      1: chalk.grey,
      2: chalk.grey,
      3: chalk.blue,
      4: chalk.yellow,
      5: chalk.red,
      6: chalk.red,
    };
    const formattedName = chalk.blueBright(`[${this.name}]`);
    const formattedMessage = messageColors[level](message);
    const logMethod = method || this.defaultLogMethod;

    this.client[logMethod](`${formattedName} ${formattedMessage}`, ...data);
  }

  public trace(message: string, ...data: any) {
    this.log({
      message,
      data,
      level: LogLevel.trace,
    });
  }

  public debug(message: string, ...data: any) {
    this.log({
      message,
      data,
      level: LogLevel.debug,
    });
  }

  public info(message: string, ...data: any) {
    this.log({
      message,
      data,
      level: LogLevel.info,
    });
  }

  public warn(message: string, ...data: any) {
    this.log({
      message,
      data,
      level: LogLevel.warn,
      method: LogMethod.warn,
    });
  }

  public error(message: string, ...data: any) {
    this.log({
      message,
      data,
      level: LogLevel.error,
      method: LogMethod.error,
    });
  }

  public fatal(message: string, ...data: any) {
    this.log({
      message,
      data,
      level: LogLevel.fatal,
      method: LogMethod.error,
    });
  }

  public setLevel(level: LogLevel) {
    this.level = level;
  }
}
