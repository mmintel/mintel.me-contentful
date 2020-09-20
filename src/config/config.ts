import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config();

const appConfig = JSON.parse(
  readFileSync(join(process.cwd(), 'config.json'), 'utf-8'),
);

export const logLevel = process.env.LOG_LEVEL || 'silly';
export const isProduction = process.env.NODE_ENV === 'production';

if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
  throw new Error(
    'You must define NEXT_PUBLIC_CONTENTFUL_SPACE_ID in your env variables!',
  );
}

if (!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
  throw new Error(
    'You must define NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN in your env variables!',
  );
}

if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
  throw new Error(
    'You must define NEXT_PUBLIC_CONTENTFUL_SPACE_ID in your env variables!',
  );
}

export const contentfulSpaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
export const contentfulAccessToken =
  process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
export const contentfulURL = process.env.NEXT_PUBLIC_CONTENTFUL_API_URL;

if (!appConfig.locales) {
  throw new Error('You must define locales in your config.json!');
}

if (!appConfig.defaultLocale) {
  throw new Error('You must define a defaultLocale in your config.json!');
}

type defaultLocale = string;

interface Locale {
  name: string;
  value: string;
  url: string;
}

export const locales = appConfig.locales as Locale[];
export const defaultLocale = appConfig.defaultLocale as defaultLocale;
