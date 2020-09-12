import { UseCase, Result } from '@/app/shared/core';
import { Page } from '../domain';
import { PageGateway } from '../gateways';
import { PageNotFoundError } from './PageNotFoundError';

interface GetPageRequestDTO {
  slug: string;
}

export class GetPageUseCase
  implements UseCase<GetPageRequestDTO, Result<Page>> {
  constructor(private pageGateway: PageGateway) {}

  async execute(request: GetPageRequestDTO) {
    const page = await this.pageGateway.getPage(request.slug);

    if (!page) {
      return Result.fail<Page, PageNotFoundError>(
        new PageNotFoundError('Could not find page.'),
      );
    }

    return Result.ok<Page>(page);
  }
}
