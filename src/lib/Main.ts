import {
  contentfulAccessToken,
  contentfulSpaceId,
  contentfulURL,
} from '@/config';
import { Locale } from '@/lib/core/domain';
import { LocaleParser } from './core/utils';
import { GraphqlService } from './core/services';

// frameworks
import { GraphQLClient } from 'graphql-request';

// import navigation feature
import { NavigationController } from '@/lib/core/features/navigation/controllers';
import { NavigationGateway } from '@/lib/core/features/navigation/gateways';
import { ContentfulNavigationGateway } from '@/lib/implementations/features/navigation/gateways';
import { NavigationDTO } from './core/features/navigation/dtos';
import { GetNavigationUseCase } from './core/features/navigation/usecases';
import { GetNavigation } from './core/features/navigation/usecases/get-navigation/GetNavigation';

// import page feature
import { PageController } from '@/lib/core/features/page/controllers';
import { PageGateway } from '@/lib/core/features/page/gateways';
import { PageDTO } from './core/features/page/dtos';
import { ContentfulPageGateway } from '@/lib/implementations/features/page/gateways';
import { GetPage, GetPageUseCase } from './core/features/page/usecases';

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
  private getPageUseCase: GetPageUseCase;

  // navigation feature
  private navigationGateway: NavigationGateway;
  private navigationController: NavigationController;
  private getNavigationUseCase: GetNavigationUseCase;

  constructor(options: MainProps) {
    // setup utils
    this.localeParser = new LocaleParser(options.language);
    this.locale = this.localeParser.parse();

    // setup services
    this.graphqlService = new GraphQLClient(
      `${contentfulURL}/${contentfulSpaceId}`,
      {
        headers: {
          Authorization: `Bearer ${contentfulAccessToken}`,
        },
      },
    );

    // setup page feature
    this.pageGateway = new ContentfulPageGateway(
      this.graphqlService,
      this.locale,
    );
    this.getPageUseCase = new GetPage(this.pageGateway);
    this.pageController = new PageController(this.getPageUseCase);

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
