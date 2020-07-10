import { NavigationService } from './navigation.service';
import { PageService } from './page.service';
import { ApiClient, ContentfulApiClient } from '../api';

if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
  throw new Error('No NEXT_PUBLIC_CONTENTFUL_SPACE_ID set!');
}

if (!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('No NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN set!');
}

const apiClient: ApiClient = new ContentfulApiClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const navigationService = new NavigationService(apiClient);
export const pageService = new PageService(apiClient);
