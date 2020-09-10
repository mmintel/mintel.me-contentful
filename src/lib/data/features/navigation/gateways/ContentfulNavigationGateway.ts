import { NavigationGateway } from '@/lib/core/features/navigation/gateways';
import { NavigationName } from '@/lib/core/features/navigation/domain';
import { DataService } from '@/lib/core/services';
import NavigationQuery from './queries/NavigationQuery.gql';
import { Logger } from '@/lib/core/utils';
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
}

export class ContentfulNavigationGateway implements NavigationGateway {
  constructor(private logger: Logger, private dataService: DataService) {}

  async getNavigation(name: NavigationName) {
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
