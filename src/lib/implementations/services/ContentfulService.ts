import { Locale } from '@/lib/core/domain';
import { GraphqlService, GraphqlQuery } from '@/lib/implementations/services';

export interface ContentfulRecord {
  sys: {
    id: string;
    firstPublishedAt: string;
    publishedAt: string;
  };
}

export interface ContentfulCollection<T> {
  items: T[];
}

export interface IContentfulService {
  request<T>(query: GraphqlQuery, data: any): Promise<T>;
}

export class ContentfulService implements IContentfulService {
  constructor(private graphqlService: GraphqlService, private locale: Locale) {}

  async request<T>(query: GraphqlQuery, data: any): Promise<T> {
    return this.graphqlService.request<T>(query, {
      locale: this.locale,
      ...data,
    });
  }
}
