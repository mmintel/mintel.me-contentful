import type { DocumentNode } from 'graphql/language/ast'

export type GraphqlVariables = { [key: string]: any }

export interface GraphQLError {
  message: string
  locations: { line: number; column: number }[]
  path: string[]
}

export interface GraphqlClient {
  request<T>(query: GraphqlQuery, variables?: GraphqlVariables): Promise<GraphqlResponse<T>>,
}

export type GraphqlQuery = DocumentNode | string;

export interface GraphqlResponse<T = any> {
  data?: T,
  errors?: GraphQLError[]
}
