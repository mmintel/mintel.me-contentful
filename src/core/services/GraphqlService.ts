import { DocumentNode } from 'graphql/language/ast';

export interface GraphqlService {
  request<T>(query: GraphqlQuery, variables?: GraphqlVariables): Promise<T>;
}

export type GraphqlQuery = string | DocumentNode;
export type GraphqlVariables = {
  [key: string]: any;
};
