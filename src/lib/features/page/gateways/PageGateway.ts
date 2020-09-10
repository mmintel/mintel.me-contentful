import { Page } from '@/lib/features/page/domain';

export interface PageGateway {
  getPage(slug: string): Page;
}
