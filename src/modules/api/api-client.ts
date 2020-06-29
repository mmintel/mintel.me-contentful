export enum ContentType {
  page = 'page',
  navigation = 'navigation',
}

export interface Query {
  [key: string]: any;
  content_type?: ContentType;
  include?: number;
}

export interface ApiClient {
  getOne: <T>(query: Query) => Promise<T>;
  getMany: <T>(query: Query) => Promise<T[]>;
}
