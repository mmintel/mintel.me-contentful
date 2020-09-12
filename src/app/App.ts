import config from '@/app/config';
import { Locale } from '@/app/shared/domain';
import { LoggerFactory } from '@/app/shared/utils';
import { ContentfulService, GraphqlService } from '@/app/shared/services';

// import navigation feature
import { GetNavigationUseCase } from '@/app/features/navigation/usecases';
import { NavigationGateway } from '@/app/features/navigation/gateways';
import { NavigationName } from '@/app/features/navigation/domain';
import { ContentfulNavigationGateway } from '@/app/features/navigation/gateways/implementations';

// import page feature
import { GetPageUseCase } from '@/app/features/page/usecases';
import { PageGateway } from '@/app/features/page/gateways';
import { ContentfulPageGateway } from '@/app/features/page/gateways/implementations';

interface AppOptions {
  locale: Locale;
}

export class App {
  // factories
  private loggerFactory: LoggerFactory;

  // services
  private graphqlService: GraphqlService;
  private contentfulService: ContentfulService;

  // page feature
  private pageGateway: PageGateway;
  private getPageUseCase: GetPageUseCase;

  // navigation feature
  private navigationGateway: NavigationGateway;
  private getNavigationUseCase: GetNavigationUseCase;

  constructor(options: AppOptions) {
    // create factories
    this.loggerFactory = new LoggerFactory(config.logLevel, console);

    // setup services
    this.graphqlService = new GraphqlService(
      this.loggerFactory.create('GraphqlService'),
      {
        url: `${config.contentfulURL}/${config.contentfulSpaceId}`,
        accessToken: config.contentfulAccessToken,
      },
    );
    this.contentfulService = new ContentfulService(
      this.graphqlService,
      options.locale,
    );

    // setup page feature
    this.pageGateway = new ContentfulPageGateway(
      this.loggerFactory.create('PageGateway'),
      this.contentfulService,
    );
    this.getPageUseCase = new GetPageUseCase(this.pageGateway);

    // setup navigation feature
    this.navigationGateway = new ContentfulNavigationGateway(
      this.loggerFactory.create('NavigationGateway'),
      this.contentfulService,
    );
    this.getNavigationUseCase = new GetNavigationUseCase(
      this.navigationGateway,
    );
  }

  init() {
    return {
      createLogger: (name: string) => this.loggerFactory.create(name),
      getPage: (slug: string) => this.getPageUseCase.execute({ slug }),
      getMainNavigation: () =>
        this.getNavigationUseCase.execute({
          name: NavigationName.MAIN_NAVIGATION,
        }),
    };
  }
}
