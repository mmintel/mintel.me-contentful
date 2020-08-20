import {
  GraphqlService,
  GraphqlQuery,
  GraphqlVariables,
} from '@/abstract/services/graphql';
import { GraphQLClient } from 'graphql-request';
import { Logger } from '@/implementations/utils';

export interface ContentfulGraphqlClientOptions {
  url: string;
  spaceId: string;
  accessToken: string;
}

export class GraphqlClient implements GraphqlService {
  private logger = new Logger('ContentfulGraphqlClient');
  private client: GraphQLClient;

  constructor(options: ContentfulGraphqlClientOptions) {
    const url = `${options.url}/${options.spaceId}`;
    this.logger.debug('Creating GraphQLRequest client with url', url);
    this.client = new GraphQLClient(url, {
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
