import { NavigationService } from './navigation.service';
import { PageService } from './page.service';
import { ApiClient, ContentfulApiClient } from '../lib/api';
import { GraphqlClient, ContentfulGraphqlClient } from '@/lib/graphql';

if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
  throw new Error('No NEXT_PUBLIC_CONTENTFUL_SPACE_ID set!');
}

if (!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('No NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN set!');
}

const graphqlClient: GraphqlClient = new ContentfulGraphqlClient({
  url: 'https://graphql.contentful.com/content/v1/spaces',
  spaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

const apiClient: ApiClient = new ContentfulApiClient(graphqlClient);

export const navigationService = new NavigationService(apiClient);
export const pageService = new PageService(apiClient);
