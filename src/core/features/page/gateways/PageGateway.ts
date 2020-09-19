import { Page } from '../domain';

export interface PageGateway {
  getPage(locale: string, slug: string): Promise<Page>;
  getAllPages(): Promise<Page[]>;
}