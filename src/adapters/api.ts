import { GraphqlService, ApiService } from '@/services';
import { Locale, NavigationName, PageTeaser } from '@/value-objects';
import { Logger } from '@/utils';
import NavigationItemsQuery from '@/graphql/navigation-items.gql';
import NavigationQuery from '@/graphql/navigation.gql';
import PageQuery from '@/graphql/page.gql';
import AllPagesQuery from '@/graphql/all-pages.gql';

interface Json {
  [key: string]: any;
}

interface Collection<T> {
  items: T[];
}

interface ContentfulRecord {
  sys: ContentfulSystemData;
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

interface ContentfulSystemData {
  id: string;
  firstPublishedAt: string;
  publishedAt: string;
}

interface ContentfulPageCollection<T> {
  pageCollection: Collection<T>;
}

interface ContentfulPage extends ContentfulRecord {
  title: string;
  description: string;
  slug: string;
  components: Json;
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

    // this is a workaround for contentful limits, maybe we can remove this
    // and add a limit to the NavigationQuery so contentful won't complain
    const navigationItems = await this.getNavigationItemsByID(
      navigation.itemsCollection.items.map(i => i.sys.id),
      locale,
    );

    // TODO controller should instantiate a Navigation, Navigation should be an entity
    return {
      id: navigation.sys.id,
      createdAt: navigation.sys.firstPublishedAt,
      updatedAt: navigation.sys.publishedAt,
      title: navigation.title,
      name: navigation.name as NavigationName,
      items: navigationItems,
    };
  }

  async getPage(slug: string, locale: Locale) {
    const response = await this.graphqlService.request<
      ContentfulPageCollection<ContentfulPage>
    >(PageQuery, { slug, locale });

    const page = response.pageCollection.items[0];

    // TODO controller should instantiate a Page, Page should be an entity
    return {
      id: page.sys.id,
      createdAt: page.sys.firstPublishedAt,
      updatedAt: page.sys.publishedAt,
      title: page.title,
      description: page.description,
      components: page.components,
      slug: page.slug,
    };
  }

  async getAllPages(locale: Locale): Promise<PageTeaser[]> {
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
