import { Navigation, NavigationName } from '@/core/features/navigation/domain';
import { NavigationGateway } from '@/core/features/navigation/gateways';
import { GraphqlService } from '@/core/services';
import {
  ContentfulNavigationDTO,
  ContentfulNavigationResponseDTO,
} from './dtos';
import { ContentfulNavigationMapper } from './mappers';
import { NavigationQuery } from './queries/NavigationQuery';

export class ContentfulNavigationGateway implements NavigationGateway {
  constructor(private graphqlService: GraphqlService) {}

  async getNavigation(
    locale: string,
    name: NavigationName,
  ): Promise<Navigation> {
    const response = await this.graphqlService.request<
      ContentfulNavigationResponseDTO<ContentfulNavigationDTO>
    >(NavigationQuery, {
      locale,
      name,
    });

    if (!response) {
      throw new Error('No navigation found.');
    }

    const contentfulNavigation = response.navigationCollection.items[0];
    const mapper = new ContentfulNavigationMapper(contentfulNavigation);
    return mapper.toDomain();
  }
}
