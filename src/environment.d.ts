import { LogLevel } from './lib/logger';

export interface ProcessEnv {
  NODE_ENV: 'development' | 'production';
  LOG_LEVEL: LogLevel;
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID: string;
  NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: string;
}
