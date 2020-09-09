import { Locale } from '@/lib/abstract/definitions';
import { ConsoleLogger } from '@/lib/concrete/utils';
import { GraphqlService, DataService } from '@/lib/abstract/services';
import {
  ContentfulDataService,
  GraphqlRequestGraphqlService,
} from '@/lib/concrete/services';

import { GetNavigationUseCase } from '@/lib/abstract/features/navigation/usecases';
import { NavigationGateway } from '@/lib/abstract/features/navigation/gateways';
import { NavigationName } from '@/lib/abstract/features/navigation/domain';
import { ContentfulNavigationGateway } from '@/lib/concrete/features/navigation/gateways';

export class Main {
  private graphqlService: GraphqlService;
  private dataService: DataService;
  private navigationGateway: NavigationGateway;
  private navigationUseCase: GetNavigationUseCase;

  constructor(locale: Locale) {
    this.graphqlService = new GraphqlRequestGraphqlService(
      new ConsoleLogger('GraphqlService'),
      {
        url: `TODO contentfulurl/spaceid kommt hier hin`,
      },
    );
    this.dataService = new ContentfulDataService(
      new ConsoleLogger('DataService'),
      this.graphqlService,
      locale,
    );
    this.navigationGateway = new ContentfulNavigationGateway(this.dataService);
    this.navigationUseCase = new GetNavigationUseCase(this.navigationGateway);
  }

  init() {
    return {
      getMainNavigation: this.navigationUseCase.execute({
        name: NavigationName.MAIN_NAVIGATION,
      }),
    };
  }
}
