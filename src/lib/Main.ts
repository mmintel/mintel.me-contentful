import config from '@/lib/config';
import { Locale } from '@/lib/core/domain';
import { LoggerFactory } from '@/lib/implementations/utils';
import {
  ContentfulService,
  GraphqlService,
} from '@/lib/implementations/services';

// import navigation feature
import { NavigationController } from '@/lib/core/features/navigation/controllers';
import { NavigationGateway } from '@/lib/core/features/navigation/gateways';
import { ContentfulNavigationGateway } from '@/lib/implementations/features/navigation/gateways';

// import page feature
import { PageController } from '@/lib/core/features/page/controllers';
import { PageGateway } from '@/lib/core/features/page/gateways';
import { ContentfulPageGateway } from '@/lib/implementations/features/page/gateways';
import { LocaleParserImpl } from './implementations/utils/LocaleParserImpl';
import { LocaleParser } from './core/utils';

interface Options {
  language: string;
}

export class Main {
  private locale: Locale;

  // utils
  private localeParser: LocaleParser;
  private loggerFactory: LoggerFactory;

  // services
  private graphqlService: GraphqlService;
  private contentfulService: ContentfulService;

  // page feature
  private pageGateway: PageGateway;
  private pageController: PageController;

  // navigation feature
  private navigationGateway: NavigationGateway;
  private navigationController: NavigationController;

  constructor(options: Options) {
    // setup utils
    this.localeParser = new LocaleParserImpl(options.language);
    this.locale = this.localeParser.parse();
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
      this.locale,
    );

    // setup page feature
    this.pageGateway = new ContentfulPageGateway(
      this.loggerFactory.create('PageGateway'),
      this.contentfulService,
    );
    this.pageController = new PageController(this.pageGateway);

    // setup navigation feature
    this.navigationGateway = new ContentfulNavigationGateway(
      this.loggerFactory.create('NavigationGateway'),
      this.contentfulService,
    );
    this.navigationController = new NavigationController(
      this.navigationGateway,
    );
  }

  init() {
    return {
      createLogger: (name: string) => this.loggerFactory.create(name),
      getPage: (slug: string) => this.pageController.getPage(slug),
      getMainNavigation: () => this.navigationController.getMainNavigation(),
    };
  }
}
