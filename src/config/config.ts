import { Locale } from '@/core/domain';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config();

const appConfig = JSON.parse(
  readFileSync(join(process.cwd(), 'config.json'), 'utf-8'),
);

export const logLevel = process.env.LOG_LEVEL || 'silly';
export const isProduction = process.env.NODE_ENV === 'production';
export const contentfulSpaceId =
  process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || 'xxxxx';
export const contentfulAccessToken =
  process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || 'xxxxx';
export const contentfulURL =
  process.env.NEXT_PUBLIC_CONTENTFUL_API_URL || 'xxxxx';

const defaultLocales: Locale[] = [
  {
    name: 'en',
    url: 'en',
    value: 'en',
  },
];

if (!appConfig.locales) {
  throw new Error('You must define locales in your config.json!');
}

if (!appConfig.defaultLocale) {
  throw new Error('You must define a defaultLocale in your config.json!');
}

export const locales = (appConfig.locales as Locale[]) || defaultLocales;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const defaultLocale = locales.find(
  (locale) => locale.name === appConfig.defaultLocale,
)!;
