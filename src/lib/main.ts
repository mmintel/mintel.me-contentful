import { Locale } from '@/lib/core/definitions';
import { LogLevel, LoggerFactory } from '@/lib/data/utils';
import {
  GraphqlService,
  DataService,
  GreeterService,
} from '@/lib/core/services';
import {
  ContentfulDataService,
  GraphqlRequestGraphqlService,
  ConsoleGreeter,
} from '@/lib/data/services';

// import navigation feature
import { GetNavigationUseCase } from '@/lib/core/features/navigation/usecases';
import { NavigationGateway } from '@/lib/core/features/navigation/gateways';
import { NavigationName } from '@/lib/core/features/navigation/domain';
import { ContentfulNavigationGateway } from '@/lib/data/features/navigation/gateways';

// import page feature
import { GetPageUseCase } from '@/lib/core/features/page/usecases';
import { PageGateway } from '@/lib/core/features/page/gateways';
import { ContentfulPageGateway } from '@/lib/data/features/page/gateways';

export class Main {
  // factories
  private loggerFactory: LoggerFactory;

  // services
  private graphqlService: GraphqlService;
  private dataService: DataService;
  private greeterService: GreeterService;

  // page feature
  private pageGateway: PageGateway;
  private getPageUseCase: GetPageUseCase;

  // navigation feature
  private navigationGateway: NavigationGateway;
  private getNavigationUseCase: GetNavigationUseCase;

  constructor(locale: Locale) {
    // create factories
    this.loggerFactory = new LoggerFactory(
      LogLevel[process.env.LOG_LEVEL!],
      console,
    );

    // setup services
    this.graphqlService = new GraphqlRequestGraphqlService(
      this.loggerFactory.create('GraphqlService'),
      {
        url: `${process.env.CONTENTFUL_API_URL!}/${process.env
          .CONTENTFUL_SPACE_ID!}`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
      },
    );
    this.greeterService = new ConsoleGreeter(console);
    this.dataService = new ContentfulDataService(this.graphqlService, locale);

    // setup page feature
    this.pageGateway = new ContentfulPageGateway(
      this.loggerFactory.create('PageGateway'),
      this.dataService,
    );
    this.getPageUseCase = new GetPageUseCase(this.pageGateway);

    // setup navigation feature
    this.navigationGateway = new ContentfulNavigationGateway(
      this.loggerFactory.create('NavigationGateway'),
      this.dataService,
    );
    this.getNavigationUseCase = new GetNavigationUseCase(
      this.navigationGateway,
    );
  }

  init() {
    return {
      greet: () => this.greeterService.greet(),
      getPage: (slug: string) => this.getPageUseCase.execute({ slug }),
      getMainNavigation: () =>
        this.getNavigationUseCase.execute({
          name: NavigationName.MAIN_NAVIGATION,
        }),
    };
  }
}
