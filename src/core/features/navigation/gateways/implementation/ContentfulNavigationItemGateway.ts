import { NavigationItem } from '@/core/features/navigation/domain';
import { NavigationItemGateway } from '@/core/features/navigation/gateways';
import { GraphqlService } from '@/core/services';
import { NavigationItemQuery } from './queries/NavigationItemQuery';
import { ContentfulNavigationItemMapper } from './mappers/ContentfulNavigationItemMapper';
import { ContentfulNavigationItemResponseDTO } from './dtos/ContentfulNavigationItemResponseDTO';

export class ContentfulNavigationItemGateway implements NavigationItemGateway {
  constructor(private graphqlService: GraphqlService) {}

  async getNavigationItem(locale: string, id: string): Promise<NavigationItem> {
    const response = await this.graphqlService.request<
      ContentfulNavigationItemResponseDTO
    >(NavigationItemQuery, {
      locale,
      id,
    });

    if (!response) {
      throw new Error(`NavigationItem with id "${id}" not found.`);
    }

    const mapper = new ContentfulNavigationItemMapper(response.navigationItem);
    return mapper.toDomain();
  }
}
