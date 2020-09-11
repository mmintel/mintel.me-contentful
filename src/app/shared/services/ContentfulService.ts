import { Locale } from '@/app/shared/domain';
import { GraphqlService, GraphqlQuery } from '@/app/shared/services';

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

export class ContentfulService {
  constructor(private graphqlService: GraphqlService, private locale: Locale) {}

  async getCollection<T>(query: GraphqlQuery, data: any): Promise<T> {
    return this.graphqlService.request<T>(query, {
      locale: this.locale,
      ...data,
    });
  }
}
