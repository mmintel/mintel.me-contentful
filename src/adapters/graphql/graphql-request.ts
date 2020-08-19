import { GraphqlClient, GraphqlQuery, GraphqlVariables } from '../../core/services/graphql';
import { GraphQLClient as GraphQLRequest } from 'graphql-request';
import { createLogger } from '@/lib/logger';

export interface ContentfulGraphqlClientOptions {
  url: string;
  spaceId: string;
  accessToken: string;
}

export class GraphqlRequestClient implements GraphqlClient {
  private logger = createLogger('ContentfulGraphqlClient');
  private client: GraphQLRequest;

  constructor(options: ContentfulGraphqlClientOptions) {
    const url = `${options.url}/${options.spaceId}`;
    this.logger.debug('Creating GraphQLRequest client with url', url);
    this.client = new GraphQLRequest(url, {
      headers: {
        Authorization: `Bearer ${options.accessToken}`,
      },
    });
  }

  async request(
    query: GraphqlQuery,
    variables?: GraphqlVariables,
  ): Promise<any> {
    return this.client.request(query, variables);
  }
}
