import { GraphqlQuery } from './GraphqlService';

interface Collection<T> {
  items: T[];
}

export interface DataService {
  getCollection<Response>(query: GraphqlQuery, data: any): Response | undefined;
}
