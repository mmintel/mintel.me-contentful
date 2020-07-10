import 'reflect-metadata';
import { Container } from 'inversify';
import { ApiClient, ContentfulApiClient } from './api';
import { PageService, NavigationService } from './services';
import { TYPES } from './types';

const container = new Container();

if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
  throw new Error('No NEXT_PUBLIC_CONTENTFUL_SPACE_ID set!');
}

if (!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('No NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN set!');
}

container.bind<ApiClient>(TYPES.ApiClient).toConstantValue(
  new ContentfulApiClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  }),
);

container.bind<PageService>(TYPES.PageService).to(PageService);
container
  .bind<NavigationService>(TYPES.NavigationService)
  .to(NavigationService);

export const pageService = container.get<PageService>(TYPES.PageService);
export const navigationService = container.get<NavigationService>(
  TYPES.NavigationService,
);
