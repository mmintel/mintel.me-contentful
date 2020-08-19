import { Page, PageTeaser, Navigation, Locale } from '@/value-objects';

export interface ApiService {
  getNavigation(name: string, locale: Locale): Promise<Navigation>;
  getPage(slug: string, locale: Locale): Promise<Page>;
  getAllPages(locale: Locale): Promise<PageTeaser[]>;
}
