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
import {
  NavigationGateway,
  NavigationItemGateway,
} from './features/navigation/gateways';
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
import {
  PageRepository,
  PageRepositoryImpl,
} from './features/page/repositories/PageRepository';
import {
  NavigationRepository,
  NavigationRepositoryImpl,
} from './features/navigation/repositories/NavigationRepository';
import {
  NavigationItemRepository,
  NavigationItemRepositoryImpl,
} from './features/navigation/repositories/NavigationItemRepository';
import { ContentfulNavigationItemGateway } from './features/navigation/gateways/implementation/ContentfulNavigationItemGateway';

interface CoreControls {
  getSite(locale: string): Promise<SiteDTO>;
  getPage(locale: string, slug: string): Promise<PageDTO>;
  getAllPages(locale: string): Promise<PageDTO[]>;
  getMainNavigation(locale: string): Promise<NavigationDTO>;
}

export class Core {
  // services
  private graphqlService: GraphqlService;

  // site feature
  private siteGateway: SiteGateway;
  private getSiteUseCase: GetSiteUseCase;
  private siteController: SiteController;

  // page feature
  private pageGateway: PageGateway;
  private pageRepository: PageRepository;
  private getPageUseCase: GetPageUseCase;
  private getAllPagesUseCase: GetAllPagesUseCase;
  private pageController: PageController;

  // navigation feature
  private navigationItemGateway: NavigationItemGateway;
  private navigationGateway: NavigationGateway;
  private navigationRepository: NavigationRepository;
  private navigationItemRepository: NavigationItemRepository;
  private getNavigationUseCase: GetNavigationUseCase;
  private navigationController: NavigationController;

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
    this.pageRepository = new PageRepositoryImpl(this.pageGateway);
    this.getPageUseCase = new GetPage(this.pageRepository);
    this.getAllPagesUseCase = new GetAllPages(this.pageRepository);
    this.pageController = new PageController(
      this.getPageUseCase,
      this.getAllPagesUseCase,
    );

    // setup navigation feature
    this.navigationGateway = new ContentfulNavigationGateway(
      this.graphqlService,
    );
    this.navigationItemGateway = new ContentfulNavigationItemGateway(
      this.graphqlService,
    );
    this.navigationItemRepository = new NavigationItemRepositoryImpl(
      this.navigationItemGateway,
      this.pageRepository,
    );
    this.navigationRepository = new NavigationRepositoryImpl(
      this.navigationGateway,
      this.navigationItemRepository,
    );
    this.getNavigationUseCase = new GetNavigation(this.navigationRepository);
    this.navigationController = new NavigationController(
      this.getNavigationUseCase,
    );
  }

  init(): CoreControls {
    return {
      getSite: (locale: string) => this.siteController.getSite(locale),
      getPage: (locale: string, slug: string) =>
        this.pageController.getPage(locale, slug),
      getAllPages: (locale: string) => this.pageController.getAllPages(locale),
      getMainNavigation: (locale: string) =>
        this.navigationController.getMainNavigation(locale),
    };
  }
}
