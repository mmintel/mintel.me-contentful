import { UseCase } from '@/app/shared/core';
import { Page } from '../domain';
import { PageGateway } from '../gateways';
import { PageNotFoundError } from './PageNotFoundError';

interface GetPageRequestDTO {
  slug: string;
}

export class GetPageUseCase implements UseCase<GetPageRequestDTO, Page> {
  constructor(private pageGateway: PageGateway) {}

  async execute(request: GetPageRequestDTO): Promise<Page> {
    try {
      const page = await this.pageGateway.getPage(request.slug);
      return page;
    } catch (e) {
      throw new PageNotFoundError(e);
    }
  }
}
