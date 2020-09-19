import {
  contentfulAccessToken,
  contentfulSpaceId,
  contentfulURL,
} from '@/config';
import { GraphqlService } from './services';

// frameworks
import { GraphQLClient } from 'graphql-request';

// import navigation feature
import { NavigationController } from './features/navigation/controllers';
import { NavigationGateway } from './features/navigation/gateways';
import { NavigationDTO } from './features/navigation/dtos';
import { GetNavigationUseCase } from './features/navigation/usecases';
import { GetNavigation } from './features/navigation/usecases/get-navigation/GetNavigation';
import { ContentfulNavigationGateway } from './features/navigation/gateways/implementation';

// import page feature
import { PageController } from './features/page/controllers';
import { PageGateway } from './features/page/gateways';
import { PageDTO } from './features/page/dtos';
import { GetPage, GetPageUseCase } from './features/page/usecases';
import { ContentfulPageGateway } from './features/page/gateways/implementation';

// import site feature
import { SiteGateway } from './features/site/gateways';
import { SiteController } from './features/site/controllers';
import { GetSite, GetSiteUseCase } from './features/site/usecases';
import { SiteDTO } from './features/site/dtos';
import {
  GetAllPages,
  GetAllPagesUseCase,
} from './features/page/usecases/get-all-pages';
import { ContentfulSiteGateway } from './features/site/gateways/implementation';

interface CoreControls {
  getSite(locale: string): Promise<SiteDTO>;
  getPage(locale: string, slug: string): Promise<PageDTO>;
  getAllPages(): Promise<PageDTO[]>;
  getMainNavigation(locale: string): Promise<NavigationDTO>;
}

export class Core {
  // services
  private graphqlService: GraphqlService;

  // site feature
  private siteGateway: SiteGateway;
  private siteController: SiteController;
  private getSiteUseCase: GetSiteUseCase;

  // page feature
  private pageGateway: PageGateway;
  private pageController: PageController;
  private getPageUseCase: GetPageUseCase;
  private getAllPagesUseCase: GetAllPagesUseCase;

  // navigation feature
  private navigationGateway: NavigationGateway;
  private navigationController: NavigationController;
  private getNavigationUseCase: GetNavigationUseCase;

  constructor() {
    // setup services
    this.graphqlService = new GraphQLClient(
      `${contentfulURL}/${contentfulSpaceId}`,
      {
        headers: {
          Authorization: `Bearer ${contentfulAccessToken}`,
        },
      },
    );

    // setup site feature
    this.siteGateway = new ContentfulSiteGateway(this.graphqlService);
    this.getSiteUseCase = new GetSite(this.siteGateway);
    this.siteController = new SiteController(this.getSiteUseCase);

    // setup page feature
    this.pageGateway = new ContentfulPageGateway(this.graphqlService);
    this.getPageUseCase = new GetPage(this.pageGateway);
    this.getAllPagesUseCase = new GetAllPages(this.pageGateway);
    this.pageController = new PageController(
      this.getPageUseCase,
      this.getAllPagesUseCase,
    );

    // setup navigation feature
    this.navigationGateway = new ContentfulNavigationGateway(
      this.graphqlService,
    );
    this.getNavigationUseCase = new GetNavigation(this.navigationGateway);
    this.navigationController = new NavigationController(
      this.getNavigationUseCase,
    );
  }

  init(): CoreControls {
    return {
      getSite: (locale: string) => this.siteController.getSite(locale),
      getPage: (locale: string, slug: string) =>
        this.pageController.getPage(locale, slug),
      getAllPages: () => this.pageController.getAllPages(),
      getMainNavigation: (locale: string) =>
        this.navigationController.getMainNavigation(locale),
    };
  }
}
