import { ApiClient } from './api';
import { GraphqlClient } from './graphql';
import { Greeter } from './greeter';

if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
  throw new Error('No NEXT_PUBLIC_CONTENTFUL_SPACE_ID set!');
}

if (!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('No NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN set!');
}

const graphqlClient = new GraphqlClient({
  url: 'https://graphql.contentful.com/content/v1/spaces',
  spaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const apiClient = new ApiClient(graphqlClient);
export const greeter = new Greeter(console);
