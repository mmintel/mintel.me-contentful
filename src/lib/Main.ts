import config from '@/lib/config';
import { Locale } from '@/lib/core/domain';

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
import { GetNavigationUseCase } from './core/features/navigation/usecases';
import { GraphqlService } from './core/services';
import { GraphqlRequestGraphqlService } from './implementations/services';
import { GetNavigation } from './core/features/navigation/usecases/get-navigation/GetNavigation';

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

  // page feature
  private pageGateway: PageGateway;
  private pageController: PageController;

  // navigation feature
  private navigationGateway: NavigationGateway;
  private navigationController: NavigationController;
  private getNavigationUseCase: GetNavigationUseCase;

  constructor(options: MainProps) {
    // setup utils
    this.localeParser = new LocaleParser(options.language);
    this.locale = this.localeParser.parse();

    // setup services
    this.graphqlService = new GraphqlRequestGraphqlService({
      url: `${config.contentfulURL}/${config.contentfulSpaceId}`,
      accessToken: config.contentfulAccessToken,
    });

    // setup page feature
    this.pageGateway = new ContentfulPageGateway(
      this.graphqlService,
      this.locale,
    );
    this.pageController = new PageController(this.pageGateway);

    // setup navigation feature
    this.navigationGateway = new ContentfulNavigationGateway(
      this.graphqlService,
      this.locale,
    );
    this.getNavigationUseCase = new GetNavigation(this.navigationGateway);
    this.navigationController = new NavigationController(
      this.getNavigationUseCase,
    );
  }

  init(): MainControls {
    return {
      getPage: (slug: string) => this.pageController.getPage(slug),
      getMainNavigation: () => this.navigationController.getMainNavigation(),
    };
  }
}
