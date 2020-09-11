import config from '@/config';
import { Locale } from '@/lib/shared/domain';
import { LoggerFactory } from '@/lib/shared/utils';
import { ContentfulService, GraphqlService } from '@/lib/shared/services';

// import navigation feature
import { GetNavigationUseCase } from '@/lib/features/navigation/usecases';
import { NavigationGateway } from '@/lib/features/navigation/gateways';
import { NavigationName } from '@/lib/features/navigation/domain';
import { ContentfulNavigationGateway } from '@/lib/features/navigation/gateways/implementations';

// import page feature
import { GetPageUseCase } from '@/lib/features/page/usecases';
import { PageGateway } from '@/lib/features/page/gateways';
import { ContentfulPageGateway } from '@/lib/features/page/gateways/implementations';

export class Main {
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

  constructor(locale: Locale) {
    // create factories
    this.loggerFactory = new LoggerFactory(config.logLevel, console);

    // setup services
    this.graphqlService = new GraphqlService(
      this.loggerFactory.create('GraphqlService'),
      {
        url: `${process.env.CONTENTFUL_API_URL!}/${process.env
          .CONTENTFUL_SPACE_ID!}`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
      },
    );
    this.contentfulService = new ContentfulService(this.graphqlService, locale);

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
      getPage: (slug: string) => this.getPageUseCase.execute({ slug }),
      getMainNavigation: () =>
        this.getNavigationUseCase.execute({
          name: NavigationName.MAIN_NAVIGATION,
        }),
    };
  }
}
