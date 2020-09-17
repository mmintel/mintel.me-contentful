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

export const isProduction = process.env.NODE_ENV === 'production';
export const contentfulSpaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
export const contentfulAccessToken =
  process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
export const contentfulURL = process.env.NEXT_PUBLIC_CONTENTFUL_API_URL;
