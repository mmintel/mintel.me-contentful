import { GraphqlQuery } from './GraphqlService';

export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue | undefined };
export type JSONArray = JSONValue[];

export interface DataService {
  getCollection(query: GraphqlQuery, data: JSONObject): JSONObject;
}
