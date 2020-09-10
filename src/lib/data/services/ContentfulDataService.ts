import { Locale } from '@/lib/core/definitions';
import { GraphqlService, DataService, GraphqlQuery } from '@/lib/core/services';

export class ContentfulDataService implements DataService {
  constructor(
    protected graphqlService: GraphqlService,
    protected locale: Locale,
  ) {}

  async getCollection<T>(query: GraphqlQuery, data: any) {
    return this.graphqlService.request<T>(query, {
      locale: this.locale,
      ...data,
    });
  }
}
