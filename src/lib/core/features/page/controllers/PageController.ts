import { PageDTO } from '../dtos';
import { GetPageUseCase } from '../usecases';

export class PageController {
  constructor(private getPageUseCase: GetPageUseCase) {}

  async getPage(slug: string): Promise<PageDTO> {
    return this.getPageUseCase.execute({ slug });
  }
}
