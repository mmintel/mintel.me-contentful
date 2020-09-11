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

export default {
  isProduction: process.env.NODE_ENV === 'production',
  env: process.env.NODE_ENV || 'development',
  logLevel: Number(process.env.LOG_LEVEL || 3),
  contentfulSpaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  contentfulAccessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  contentfulURL: process.env.NEXT_PUBLIC_CONTENTFUL_API_URL,
};
