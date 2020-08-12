import { ApiClient } from './api';
import { GraphqlClient } from '@/lib/graphql';
import { Page } from '@/core/value-objects/page';
import { PageTeaser } from '@/core/value-objects/page-teaser';
import { NavigationItem } from '@/core/value-objects/navigation-item';
import { Page } from '@/core/value-objects/page';
import { PageTeaser } from '@/core/value-objects/page-teaser';
import { NavigationItem } from '@/core/value-objects/navigation-item';
import { NavigationName } from '@/core/value-objects/navigation-name';
import { Locale } from '@/core/value-objects/locale';
import { createLogger } from '../logger';
import NavigationItemsQuery from '@/graphql/queries/navigation-items.gql';
import NavigationQuery from '@/graphql/queries/navigation.gql';
import PageQuery from '@/graphql/queries/page.gql';
import AllPagesQuery from '@/graphql/queries/all-pages.gql';

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

export class ContentfulApiClient implements ApiClient {
  private logger = createLogger('ContentfulApiClient');

  constructor(private graphqlClient: GraphqlClient) {}

  async getNavigation(name: NavigationName, locale: Locale) {
    const response = await this.graphqlClient.request<
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
    const response = await this.graphqlClient.request<
      ContentfulPageCollection<ContentfulPage>
    >(PageQuery, { slug, locale });

    const page = response.pageCollection.items[0];

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

  async getAllPages(locale: Locale) {
    const response = await this.graphqlClient.request<
      ContentfulPageCollection<Pick<Cons;
  }

  privturn response.pageCollection.itemate async getNavigationItemsByID(
    ids: string[],
    locale: Locale,
  ) {
    const response = await this.graphqlClient.request<
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
