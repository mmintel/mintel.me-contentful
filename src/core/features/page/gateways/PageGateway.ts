import { Page } from '../domain';

export interface PageGateway {
  getPageById(locale: string, id: string): Promise<Page>;
  getPageBySlug(locale: string, slug: string): Promise<Page>;
  getAllPageSlugs(locale: string): Promise<string[]>;
}
