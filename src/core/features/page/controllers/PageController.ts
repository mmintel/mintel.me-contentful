import { PageDTO } from '../dtos';
import { PageMapper } from '../mappers';
import { GetPageUseCase } from '../usecases';
import { GetAllPagesUseCase } from '../usecases/get-all-pages';

export class PageController {
  constructor(
    private getPageUseCase: GetPageUseCase,
    private getAllPagesUseCase: GetAllPagesUseCase,
  ) {}

  async getPage(locale: string, slug: string): Promise<PageDTO> {
    const page = await this.getPageUseCase.execute({
      locale,
      slug,
    });
    const mapper = new PageMapper(page);
    return mapper.toDTO();
  }

  async getAllPages(locale: string): Promise<PageDTO[]> {
    const allPages = await this.getAllPagesUseCase.execute({ locale });

    return allPages.map((page) => {
      const mapper = new PageMapper(page);
      return mapper.toDTO();
    });
  }
}
