export enum ContentType {
  page = 'page',
  navigation = 'navigation',
}

export interface Query {
  type: ContentType;
  levels?: number;
  fields?: FieldsQuery;
}

export interface FieldsQuery {
  [key: string]: any;
}

export interface Record<T> {
  meta: RecordMeta;
  data: T;
}

interface RecordMeta {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiClient {
  getOne: <T>(query: Query) => Promise<Record<T>>;
  getMany: <T>(query: Query) => Promise<Record<T>[]>;
}
