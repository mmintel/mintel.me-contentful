import { GraphQLClient } from 'graphql-request';
import {
  GraphqlService,
  GraphqlQuery,
  GraphqlVariables,
} from '@/lib/core/services';

interface Options {
  url: string;
  accessToken: string;
}

export class GraphqlRequestGraphqlService implements GraphqlService {
  private client: GraphQLClient;

  constructor(private options: Options) {
    this.client = new GraphQLClient(options.url, {
      headers: {
        Authorization: `Bearer ${options.accessToken}`,
      },
    });
  }

  async request<T>(
    query: GraphqlQuery,
    variables?: GraphqlVariables,
  ): Promise<T> {
    return this.client.request<T>(query, variables);
  }
}
