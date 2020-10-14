export const logLevel = process.env.LOG_LEVEL || 'silly';
export const isProduction = process.env.NODE_ENV === 'production';
export const contentfulSpaceId =
  process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || 'xxxxx';
export const contentfulAccessToken =
  process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || 'xxxxx';
export const contentfulURL =
  process.env.NEXT_PUBLIC_CONTENTFUL_API_URL || 'xxxxx';
