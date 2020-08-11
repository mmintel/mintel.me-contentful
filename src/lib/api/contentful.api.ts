import { ApiClient } from './api';
import { GraphqlClient } from '@/lib/graphql';
import {
  Page,
  PageTeaser,
  Record,
  Navigation,
  NavigationItem,
  NavigationName,
  Locale,
} from '@/models';
import gql from 'graphql-tag';
import { createLogger } from '../logger';
import { Json } from '@/types/json.type';

// TODO move graphql queries to own files

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
    const navigation = response.navigationCollection.items[0];
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
      },
    };
  }

  async getPage(slug: string, locale: Locale): Promise<Record<Page>> {
    const response = await this.graphqlClient.request<
      ContentfulPageCollection<ContentfulPage>
    >(
      gql`
        query PageQuery($slug: String!, $locale: String!) {
          pageCollection(limit: 1, locale: $locale, where: { slug: $slug }) {
            items {
              slug
              title
              description
              components {
                links {
                  entries {
                    block {
                      sys {
                        id
                      }
                    }
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
      { slug, locale },
    );

    const page = response.pageCollection.items[0];

    return {
      data: {
        title: page.title,
        description: page.description,
        components: page.components,
        slug: page.slug,
      },
      meta: {
        id: page.sys.id,
        createdAt: page.sys.firstPublishedAt,
        updatedAt: page.sys.publishedAt,
      },
    };
  }

  async getAllPages(locale: Locale): Promise<PageTeaser[]> {
    const response = await this.graphqlClient.request<
      ContentfulPageCollection<Pick<ContentfulPage, 'slug'>>
    >(
      gql`
        query PageQuery($slug: String!, $locale: String!) {
          pageCollection(locale: $locale) {
            items {
              slug
            }
          }
        }
      `,
      { locale },
    );

    return response.pageCollection.items;
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

    return response.navigationItemCollection.items.map(item => ({
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
      },
    }));
  }
}
