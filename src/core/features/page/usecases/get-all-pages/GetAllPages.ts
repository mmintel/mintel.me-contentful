import { Page } from '../../domain';
import { PageGateway } from '../../gateways';
import { GetAllPagesUseCase } from './GetAllPagesUseCase';

export class GetAllPages implements GetAllPagesUseCase {
  constructor(private pageGateway: PageGateway) {}

  async execute(): Promise<Page[]> {
    const allPages = await this.pageGateway.getAllPages();
    return allPages;
  }
}
