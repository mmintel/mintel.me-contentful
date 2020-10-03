import { Page } from '../../domain';
import { PageRepository } from '../../repositories/PageRepository';
import { GetAllPagesRequest } from './GetAllPagesRequest';
import { GetAllPagesUseCase } from './GetAllPagesUseCase';

export class GetAllPages implements GetAllPagesUseCase {
  constructor(private pageRepository: PageRepository) {}

  async execute(request: GetAllPagesRequest): Promise<Page[]> {
    return this.pageRepository.all(request.locale);
  }
}
