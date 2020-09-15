import config from '@/lib/config';
import { Locale } from '@/lib/core/domain';
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
import { LocaleParser } from './core/utils';
import { PageDTO } from './core/features/page/dtos';
import { NavigationDTO } from './core/features/navigation/dtos';

interface MainProps {
  language: string;
}

interface MainControls {
  getPage(slug: string): Promise<PageDTO>;
  getMainNavigation(): Promise<NavigationDTO>;
}

export class Main {
  private locale: Locale;

  // utils
  private localeParser: LocaleParser;

  // services
  private graphqlService: GraphqlService;
  private contentfulService: ContentfulService;

  // page feature
  private pageGateway: PageGateway;
  private pageController: PageController;

  // navigation feature
  private navigationGateway: NavigationGateway;
  private navigationController: NavigationController;

  constructor(options: MainProps) {
    // setup utils
    this.localeParser = new LocaleParser(options.language);
    this.locale = this.localeParser.parse();

    // setup services
    this.graphqlService = new GraphqlService({
      url: `${config.contentfulURL}/${config.contentfulSpaceId}`,
      accessToken: config.contentfulAccessToken,
    });
    this.contentfulService = new ContentfulService(
      this.graphqlService,
      this.locale,
    );

    // setup page feature
    this.pageGateway = new ContentfulPageGateway(this.contentfulService);
    this.pageController = new PageController(this.pageGateway);

    // setup navigation feature
    this.navigationGateway = new ContentfulNavigationGateway(
      this.contentfulService,
    );
    this.navigationController = new NavigationController(
      this.navigationGateway,
    );
  }

  init(): MainControls {
    return {
      getPage: (slug: string) => this.pageController.getPage(slug),
      getMainNavigation: () => this.navigationController.getMainNavigation(),
    };
  }
}
