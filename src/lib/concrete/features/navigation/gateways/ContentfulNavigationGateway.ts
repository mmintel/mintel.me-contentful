import { NavigationGateway } from '@/lib/abstract/features/navigation/gateways';
import {
  Navigation,
  NavigationName,
} from '@/lib/abstract/features/navigation/domain';
import { DataService } from '@/lib/abstract/services';
import NavigationQuery from './queries/NavigationQuery.gql';
import { Logger } from '@/lib/abstract/utils';
import { NavigationModel } from '../models/Navigation';

interface ContentfulNavigationResponse {
  navigationCollection: {
    items: ContentfulNavigation[];
  };
}

interface ContentfulNavigation {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  name: string;
  itemsCollection: Relation;
}

export class ContentfulNavigationGateway implements NavigationGateway {
  constructor(private logger: Logger, private dataService: DataService) {}

  async getNavigation(name: NavigationName): Promise<Navigation> {
    const response = await this.dataService.getCollection<
      ContentfulNavigationResponse
    >(NavigationQuery, {
      name,
    });

    if (!response) {
      this.logger.error('WTF, no navigation.');
      throw new Error('No navigation found.');
    }

    this.logger.debug('Received navigation response', response);
    const navigation = response.navigationCollection.items[0];

    return new NavigationModel(navigation);
  }
}
