import { NavigationGateway } from '@/lib/abstract/features/navigation/gateways';
import {
  Navigation,
  NavigationName,
} from '@/lib/abstract/features/navigation/domain';
import { DataService } from '@/lib/abstract/services';
import NavigationQuery from './queries/NavigationQuery.gql';

interface ContentfulNavigation extends ContentfulRecord {
  title: string;
  name: string;
  itemsCollection: Relation;
}

export class ContentfulNavigationGateway implements NavigationGateway {
  constructor(private dataService: DataService) {}

  async getNavigation(name: NavigationName): Promise<Navigation | undefined> {
    const response = await this.dataService.getCollection<ContentfulNavigation>(
      NavigationQuery,
      {
        name,
      },
    );

    this.loggerService.info('Received navigation response', response);
    const navigation = response.navigationCollection.items[0];

    // TODO controller should instantiate a Navigation, Navigation should be an entity
    return navigation;
  }
}
