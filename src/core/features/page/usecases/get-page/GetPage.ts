import { Page } from '../../domain';
import { PageRepository } from '../../repositories/PageRepository';
import { GetPageRequest } from './GetPageRequest';
import { GetPageUseCase } from './GetPageUseCase';
import { PageNotFoundError } from './PageNotFoundError';

export class GetPage implements GetPageUseCase {
  constructor(private pageRepository: PageRepository) {}

  async execute(request: GetPageRequest): Promise<Page> {
    try {
      const page = await this.pageRepository.findBySlug(
        request.locale,
        request.slug,
      );

      return page;
    } catch (e) {
      throw new PageNotFoundError(e);
    }
  }
}
