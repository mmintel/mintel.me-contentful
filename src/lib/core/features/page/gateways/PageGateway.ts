import { PageDTO } from '../dtos';

export interface PageGateway {
  getPage(slug: string): Promise<PageDTO>;
}
