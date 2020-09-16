import { Locale } from '@/lib/core/domain';
import {
  GraphqlQuery,
  GraphqlService,
  GraphqlVariables,
} from '@/lib/core/services';

export class ContentfulGateway {
  constructor(private graphqlService: GraphqlService, private locale: Locale) {}

  protected request<T>(
    query: GraphqlQuery,
    variables?: GraphqlVariables,
  ): Promise<T> {
    return this.graphqlService.request<T>(query, {
      locale: this.locale,
      ...variables,
    });
  }
}
