import { Logger } from 'tslog';
import { logLevel } from '@/config';

const AppLogger = new Logger({
  name: 'App',
  minLevel: logLevel,
});

export const createLogger = (name: string): Logger =>
  AppLogger.getChildLogger({ name });
export { Logger };
