import { Page } from '../../domain';
import { PageGateway } from '../../gateways';
import { GetAllPagesRequest } from './GetAllPagesRequest';
import { GetAllPagesUseCase } from './GetAllPagesUseCase';

export class GetAllPages implements GetAllPagesUseCase {
  constructor(private pageGateway: PageGateway) {}

  async execute(request: GetAllPagesRequest): Promise<Page[]> {
    const allPages = await this.pageGateway.getAllPages(request.locale);
    return allPages;
  }
}
