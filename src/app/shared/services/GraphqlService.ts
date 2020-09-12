import { GraphQLClient } from 'graphql-request';
import { DocumentNode } from 'graphql/language/ast';
import { Logger } from '@/app/shared/utils';

export type GraphqlQuery = string | DocumentNode;
export type GraphqlVariables = {
  [key: string]: any;
};

interface Options {
  url: string;
  accessToken: string;
}

export class GraphqlService {
  private client: GraphQLClient;

  constructor(private logger: Logger, private options: Options) {
    this.client = new GraphQLClient(options.url, {
      headers: {
        Authorization: `Bearer ${options.accessToken}`,
      },
    });
  }

  async request<T>(
    query: GraphqlQuery,
    variables?: GraphqlVariables,
  ): Promise<any> {
    this.logger.debug(`Requesting ${this.options.url} with`, {
      query,
      variables,
    });
    return this.client.request<T>(query, variables);
  }
}
