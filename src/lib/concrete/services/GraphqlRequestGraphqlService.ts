import {
  GraphqlService,
  GraphqlQuery,
  GraphqlVariables,
} from '@/lib/abstract/services';
import { GraphQLClient } from 'graphql-request';
import { Logger } from '@/lib/abstract/utils';

interface Options {
  url: string;
  accessToken: string;
}

export class GraphqlRequestGraphqlService implements GraphqlService {
  private client: GraphQLClient;

  constructor(private logger: Logger, private options: Options) {
    this.client = new GraphQLClient(options.url, {
      headers: {
        Authorization: `Bearer ${options.accessToken}`,
      },
    });
  }

  async request(
    query: GraphqlQuery,
    variables?: GraphqlVariables,
  ): Promise<any> {
    this.logger.debug(`Requesting ${this.options.url} with`, {
      query,
      variables,
    });
    return this.client.request(query, variables);
  }
}
