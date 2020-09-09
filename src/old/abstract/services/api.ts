import { Locale } from '@/old/abstract/types';
import { NavigationDTO, PageDTO } from '@/old/abstract/dtos';

export interface ApiService {
  getNavigation(name: string, locale: Locale): Promise<NavigationDTO>;
  getPage(slug: string, locale: Locale): Promise<PageDTO>;
  getPageSlugs(locale: Locale): Promise<Pick<PageDTO, 'slug'>[]>;
}
