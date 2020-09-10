import { GraphqlQuery } from './GraphqlService';

export interface DataService {
  getCollection<Response>(query: GraphqlQuery, data: any): Response | undefined;
}
