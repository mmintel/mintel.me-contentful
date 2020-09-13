import { Page } from '@/lib/core/features/page/domain';

export interface PageGateway {
  getPage(slug: string): Promise<Page>;
}
