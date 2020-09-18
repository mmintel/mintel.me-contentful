import { Page } from '../domain';

export interface PageGateway {
  getPage(slug: string): Promise<Page>;
  getAllPages(): Promise<Page[]>;
}
