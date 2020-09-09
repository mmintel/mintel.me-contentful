import {
  GraphqlService,
  GraphqlQuery,
  GraphqlVariables,
} from '@/old/abstract/services/graphql';
import { GraphQLClient } from 'graphql-request';
import { Logger } from '@/old/implementations/utils';

export interface ContentfulGraphqlClientOptions {
  url: string;
  spaceId: string;
  accessToken: string;
}

export class GraphqlRequestGraphqlService implements GraphqlService {
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
