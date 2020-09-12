import { Page } from '@/app/features/page/domain';

export interface PageGateway {
  getPage(slug: string): Promise<Page>;
}
