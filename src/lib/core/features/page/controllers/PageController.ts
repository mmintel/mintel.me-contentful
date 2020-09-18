import { PageDTO } from '../dtos';
import { PageMapper } from '../mappers';
import { GetPageUseCase } from '../usecases';

export class PageController {
  constructor(private getPageUseCase: GetPageUseCase) {}

  async getPage(slug: string): Promise<PageDTO> {
    const page = await this.getPageUseCase.execute({ slug });
    const mapper = new PageMapper(page);
    return mapper.toDTO();
  }
}
