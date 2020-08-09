import {
  GraphqlClient,
  GraphqlQuery,
  GraphqlVariables,
  GraphqlResponse,
} from './client';
import { GraphQLClient as GraphQLRequest } from 'graphql-request';

export interface ContentfulGraphqlClientOptions {
  url: string;
  spaceId: string;
  accessToken: string;
}

export class ContentfulGraphqlClient implements GraphqlClient {
  private client: GraphQLRequest;

  constructor(options: ContentfulGraphqlClientOptions) {
    this.client = new GraphQLRequest(options.url + options.spaceId);
  }

  async request(
    query: GraphqlQuery,
    variables?: GraphqlVariables,
  ): Promise<GraphqlResponse> {
    return this.client.request(query, variables);
  }
}
