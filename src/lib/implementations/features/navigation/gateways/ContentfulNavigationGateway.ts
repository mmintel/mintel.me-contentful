import {
  Navigation,
  NavigationName,
} from '@/lib/core/features/navigation/domain';
import { NavigationGateway } from '@/lib/core/features/navigation/gateways';
import {
  ContentfulCollectionDTO,
  ContentfulRecordDTO,
} from '@/lib/implementations/dtos';
import { ContentfulGateway } from '@/lib/implementations/gateways';
import { NavigationQuery } from './queries/NavigationQuery';

export interface ContentfulNavigationResponseDTO {
  navigationCollection: ContentfulCollectionDTO<ContentfulNavigation>;
}

export interface ContentfulNavigation extends ContentfulRecordDTO {
  title: string;
  name: string;
  itemsCollection: ContentfulCollectionDTO<ContentfulNavigationItem>;
}

export interface ContentfulNavigationItem extends ContentfulRecordDTO {
  title: string;
  url: string;
  internal: boolean;
  page: {
    slug: string;
  };
}

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

    const rawNavigation = response.navigationCollection.items[0];
    const navigation = new Navigation({
      id: rawNavigation.sys.id,
      title: rawNavigation.title,
      name: rawNavigation.name,
      items: rawNavigation.itemsCollection.items.map(rawNavigationItem => ({
        id: rawNavigationItem.sys.id,
        title: rawNavigationItem.title,
        internal: rawNavigationItem.internal,
        url: rawNavigationItem.url,
        page: {
          slug: rawNavigationItem.page.slug,
        },
      })),
    });

    return navigation;
  }
}
