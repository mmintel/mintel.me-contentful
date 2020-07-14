import { Record } from '@/models';

export enum ContentType {
  Page = 'page',
  navigation = 'navigation',
}

export interface Query {
  type: ContentType,
  levels?: number,
  fields?: FieldsQuery,
}

export interface FieldsQuery {
  [key: string]: any,
}

export interface ApiClient {
  getOne: <T>(query: Query) => Promise<Record<T>>,
  getMany: <T>(query: Query) => Promise<Record<T>[]>,
}
