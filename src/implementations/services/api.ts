import { GraphqlService, ApiService } from '@/abstract/services';
import {
  Locale,
  NavigationName,
  PageTeaser,
  JSONValue,
  JSONObject,
  JSONArray,
} from '@/abstract/types';
import { Logger } from '@/implementations/utils';
import NavigationItemsQuery from '@/graphql/navigation-items.gql';
import NavigationQuery from '@/graphql/navigation.gql';
import PageQuery from '@/graphql/page.gql';
import AllPagesQuery from '@/graphql/all-pages.gql';

interface Collection<T extends JSONValue> extends JSONObject {
  items: T[];
}

interface ContentfulRecord extends JSONObject {
  sys: ContentfulSystemData;
}

interface ContentfulSystemData extends JSONObject {
  id: string;
  firstPublishedAt: string;
  publishedAt: string;
}

interface ContentfulNavigationResponse {
  navigationCollection: Collection<ContentfulNavigation>;
}

interface ContentfulNavigation extends ContentfulRecord {
  title: string;
  name: string;
  itemsCollection: Relation;
}

type Relation = Collection<ContentfulRecord>;

interface ContentfulNavigationItemsResponse {
  navigationItemCollection: Collection<ContentfulNavigationItem>;
}

interface ContentfulNavigationItem extends ContentfulRecord {
  title: string;
  internal: boolean;
  url?: string;
  page?: {
    slug: string;
  };
}

interface ContentfulPageCollection<T extends JSONValue> {
  pageCollection: Collection<T>;
}

interface ContentfulPage extends ContentfulRecord {
  title: string;
  description: string;
  slug: string;
  components: JSONArray;
}

export class NavigationRequestError extends Error {
  name = 'NavigationRequestError';
}

export class NavigationItemRequestError extends Error {
  name = 'NavigationItemRequestError';
}

export class PageRequestError extends Error {
  name = 'PageRequestError';
}

export class ApiClient implements ApiService {
  private logger = new Logger('ContentfulApiClient');

  constructor(private graphqlService: GraphqlService) {}

  async getNavigation(name: NavigationName, locale: Locale) {
    const response = await this.graphqlService.request<
      ContentfulNavigationResponse
    >(NavigationQuery, {
      name,
      locale,
    });

    this.logger.info('Received navigation response', response);
    const navigation = response.navigationCollection.items[0];

    // TODO controller should instantiate a Navigation, Navigation should be an entity
    return navigation;
  }

  async getPage(slug: string, locale: Locale) {
    const response = await this.graphqlService.request<
      ContentfulPageCollection<ContentfulPage>
    >(PageQuery, { slug, locale });

    const page = response.pageCollection.items[0];

    // TODO controller should instantiate a Page, Page should be an entity
    return page;
  }

  async getPageSlugs(locale: Locale) {
    const response = await this.graphqlService.request<
      ContentfulPageCollection<Pick<ContentfulPage, 'slug'>>
    >(AllPagesQuery, { locale });

    return response.pageCollection.items;
  }

  private async getNavigationItemsByID(ids: string[], locale: Locale) {
    const response = await this.graphqlService.request<
      ContentfulNavigationItemsResponse
    >(NavigationItemsQuery, { locale, ids });

    return response.navigationItemCollection.items.map(item => ({
      id: item.sys.id,
      createdAt: item.sys.firstPublishedAt,
      updatedAt: item.sys.publishedAt,
      title: item.title,
      page: item.page,
      url: item.url,
      internal: item.internal,
    }));
  }
}
