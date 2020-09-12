declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      LOG_LEVEL: number;
      NEXT_PUBLIC_CONTENTFUL_SPACE_ID: string;
      NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: string;
      NEXT_PUBLIC_CONTENTFUL_API_URL: string;
    }
  }
}
