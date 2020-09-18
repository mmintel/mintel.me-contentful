import { PageDTO } from '../../dtos';
import { PageGateway } from '../../gateways';
import { GetAllPagesUseCase } from './GetAllPagesUseCase';

export class GetAllPages implements GetAllPagesUseCase {
  constructor(private pageGateway: PageGateway) {}

  async execute(): Promise<PageDTO[]> {
    const allPages = await this.pageGateway.getAllPages();
    return allPages;
  }
}
