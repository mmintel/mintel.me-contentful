import { ApiClient, ContentfulApiAdapter } from './api';
import { PageService } from './page';
import { NavigationService } from './navigation';
import { ContentfulService } from './contentful';

export * from './page/page.interfaces';
export * from './navigation/navigation.interfaces';
export * from './api/api.interfaces';

const contentfulService: ContentfulService = new ContentfulService({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

const apiClient: ApiClient = new ContentfulApiAdapter(contentfulService);

export const pageService = new PageService(apiClient);
export const navigationService = new NavigationService(apiClient);
