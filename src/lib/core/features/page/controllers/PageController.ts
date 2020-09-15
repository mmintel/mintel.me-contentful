import { PageDTO } from '../dtos';
import { PageGateway } from '../gateways';
import { GetPageUseCase } from '../usecases';

export class PageController {
  private getPageUseCase: GetPageUseCase;

  constructor(pageGateway: PageGateway) {
    this.getPageUseCase = new GetPageUseCase(pageGateway);
  }

  async getPage(slug: string): Promise<PageDTO> {
    return this.getPageUseCase.execute({ slug });
  }
}
