import { ApiClient } from './api';
import { GraphqlClient } from '@/lib/graphql';
import {
  Page,
  Record,
  Navigation,
  NavigationItem,
  NavigationName,
  Locale,
} from '@/models';
import gql from 'graphql-tag';
import { createLogger } from '../logger';

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

export class NavigationRequestError extends Error {
  name = 'NavigationRequestError';
}

export class NavigationItemRequestError extends Error {
  name = 'NavigationItemRequestError';
}

export class ContentfulApiClient implements ApiClient {
  private logger = createLogger('ContentfulApiClient');

  constructor(private graphqlClient: GraphqlClient) {}

  async getNavigation(
    name: NavigationName,
    locale: Locale,
  ): Promise<Record<Navigation>> {
    const response = await this.graphqlClient.request<
      ContentfulNavigationResponse
    >(
      gql`
        query NavigationQuery($name: String!, $locale: String!) {
          navigationCollection(locale: $locale, where: { name: $name }) {
            items {
              title
              name
              itemsCollection {
                items {
                  sys {
                    id
                  }
                }
              }
              sys {
                id
                firstPublishedAt
                publishedAt
              }
            }
          }
        }
      `,
      {
        name,
        locale,
      },
    );

    this.logger.info('Received navigation response', response);

    if (!response.data || response.errors) {
      if (response.errors) {
        response.errors.map(err => this.logger.error(err.message));
      }

      throw new NavigationRequestError(
        `Could not find navigation with name: "${name}".`,
      );
    }

    const navigation = response.data.navigationCollection.items[0];
    const navigationItems = await this.getNavigationItemsByID(
      navigation.itemsCollection.items.map(i => i.sys.id),
      locale,
    );

    return {
      data: {
        title: navigation.title,
        name: navigation.name as NavigationName,
        items: navigationItems,
      },
      meta: {
        id: navigation.sys.id,
        createdAt: navigation.sys.firstPublishedAt,
        updatedAt: navigation.sys.publishedAt,
        locale,
      },
    };
  }

  async getPage(slug: string): Promise<Page> {
    return this.graphqlClient.request<Page>(``);
  }

  private async getNavigationItemsByID(
    ids: string[],
    locale: Locale,
  ): Promise<Record<NavigationItem>[]> {
    const response = await this.graphqlClient.request<
      ContentfulNavigationItemsResponse
    >(
      gql`
        query NavigationItemsQuery($ids: [String]!, $locale: String!) {
          navigationItemCollection(
            locale: $locale
            where: { sys: { id_in: $ids } }
          ) {
            items {
              title
              page {
                slug
              }
              url
              internal
              sys {
                id
                firstPublishedAt
                publishedAt
              }
            }
          }
        }
      `,
      { locale, ids },
    );

    if (!response.data || response.errors) {
      if (response.errors) {
        response.errors.map(err => this.logger.error(err.message));
      }

      throw new NavigationItemRequestError(`Could not find navigation items.`);
    }

    return response.data.navigationItemCollection.items.map(item => ({
      data: {
        title: item.title,
        page: item.page,
        url: item.url,
        internal: item.internal,
      },
      meta: {
        id: item.sys.id,
        createdAt: item.sys.firstPublishedAt,
        updatedAt: item.sys.publishedAt,
        locale,
      },
    }));
  }
}
