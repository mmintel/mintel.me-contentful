import 'reflect-metadata';
import { Container } from 'inversify';
import { ApiClient, ContentfulApiAdapter } from './api';
import { PageService } from './page';
import { NavigationService } from './navigation';
import { ContentfulService } from './contentful';
import { TYPES } from './types';

export * from './page/page.interfaces';
export * from './navigation/navigation.interfaces';
export * from './api/api.interfaces';

interface TypeRegistry {
  [key: string]: symbol;
}

class Modules {
  private container = new Container();
  public pageService: PageService;
  public navigationService: NavigationService;

  constructor(private types: TypeRegistry) {}

  init() {
    this.container
      .bind<ApiClient>(this.types.ApiClient)
      .to(ContentfulApiAdapter);
    this.container.bind<PageService>(this.types.PageService).to(PageService);
    this.container
      .bind<NavigationService>(this.types.NavigationService)
      .to(NavigationService);
    this.container
      .bind<ContentfulService>(this.types.ContentfulService)
      .toConstantValue(
        new ContentfulService({
          space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
          accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
        }),
      );

    this.pageService = this.container.get<PageService>(this.types.PageService);
    this.navigationService = this.container.get<NavigationService>(
      this.types.NavigationService,
    );
  }
}

export default new Modules(TYPES).init();
