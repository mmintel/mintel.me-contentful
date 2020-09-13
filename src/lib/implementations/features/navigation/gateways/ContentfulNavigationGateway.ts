import {
  Navigation,
  NavigationName,
} from '@/lib/core/features/navigation/domain';
import { NavigationGateway } from '@/lib/core/features/navigation/gateways';
import { Logger } from '@/lib/implementations/utils';
import {
  ContentfulService,
  ContentfulCollection,
  ContentfulRecord,
} from '@/lib/implementations/services';

import NavigationQuery from './queries/NavigationQuery.gql';

interface ContentfulNavigationResponse {
  navigationCollection: ContentfulCollection<ContentfulNavigation>;
}

interface ContentfulNavigation extends ContentfulRecord {
  title: string;
  name: string;
  itemsCollection: ContentfulCollection<ContentfulNavigationItem>;
}

interface ContentfulNavigationItem extends ContentfulRecord {
  title: string;
  url: string;
  internal: boolean;
  page: {
    slug: string;
  };
}

export class ContentfulNavigationGateway implements NavigationGateway {
  constructor(
    private logger: Logger,
    private contentfulService: ContentfulService,
  ) {}

  async getNavigation(name: NavigationName): Promise<Navigation> {
    const response = await this.contentfulService.request<
      ContentfulNavigationResponse
    >(NavigationQuery, {
      name,
    });

    if (!response) {
      throw new Error('No navigation found.');
    }

    this.logger.debug('Received navigation response', response);
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
