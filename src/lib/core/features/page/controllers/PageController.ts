import { LocaleParser } from '@/lib/core/utils';
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
    const localeParser = new LocaleParser(locale);
    const page = await this.getPageUseCase.execute({
      locale: localeParser.parse(),
      slug,
    });
    const mapper = new PageMapper(page);
    return mapper.toDTO();
  }

  async getAllPages(): Promise<PageDTO[]> {
    const allPages = await this.getAllPagesUseCase.execute();
    return allPages.map(page => {
      const mapper = new PageMapper(page);
      return mapper.toDTO();
    });
  }
}
