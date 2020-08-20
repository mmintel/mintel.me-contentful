import { Locale, JSONObject, JSONArray } from '@/abstract/types';

export interface ApiService {
  getNavigation(name: string, locale: Locale): Promise<JSONObject>;
  getPage(slug: string, locale: Locale): Promise<JSONObject>;
  getPageSlugs(locale: Locale): Promise<JSONArray>;
}
