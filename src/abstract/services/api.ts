import { Locale } from '@/abstract/types';
import { NavigationDTO, PageDTO } from '@/abstract/dtos';

export interface ApiService {
  getNavigation(name: string, locale: Locale): Promise<NavigationDTO>;
  getPage(slug: string, locale: Locale): Promise<PageDTO>;
  getPageSlugs(locale: Locale): Promise<Pick<PageDTO, 'slug'>[]>;
}
