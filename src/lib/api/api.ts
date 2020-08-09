import { Page, Navigation, Record, Locale } from '@/models';

export interface ApiClient {
  getNavigation(name: string, locale: Locale): Promise<Record<Navigation>>;
  getPage(slug: string): Promise<Page>;
}
