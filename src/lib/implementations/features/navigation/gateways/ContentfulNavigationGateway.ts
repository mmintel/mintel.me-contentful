import {
  Navigation,
  NavigationName,
} from '@/lib/core/features/navigation/domain';
import { NavigationGateway } from '@/lib/core/features/navigation/gateways';
import { ContentfulGateway } from '@/lib/implementations/gateways';
import { ContentfulNavigationResponseDTO } from '../dtos';
import { ContentfulNavigationMapper } from '../mappers';
import { NavigationQuery } from './queries/NavigationQuery';

export class ContentfulNavigationGateway extends ContentfulGateway
  implements NavigationGateway {
  async getNavigation(name: NavigationName): Promise<Navigation> {
    const response = await this.request<ContentfulNavigationResponseDTO>(
      NavigationQuery,
      {
        name,
      },
    );

    if (!response) {
      throw new Error('No navigation found.');
    }

    const contentfulNavigation = response.navigationCollection.items[0];
    const responseModel = new ContentfulNavigationMapper(contentfulNavigation);

    return responseModel.toDomain();
  }
}
