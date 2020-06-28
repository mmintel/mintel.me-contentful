import { ApiClient, Contentful } from './api';

export const apiClient: ApiClient = new Contentful({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});
