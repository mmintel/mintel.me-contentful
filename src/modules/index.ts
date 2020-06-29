import { ApiClient, Contentful } from './api';
import { PageService } from './page';
import { NavigationService } from './navigation';

export * from './page/page.interfaces';
export * from './navigation/navigation.interfaces';

const apiClient: ApiClient = new Contentful({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const pageService = new PageService(apiClient);
export const navigationService = new NavigationService(apiClient);
