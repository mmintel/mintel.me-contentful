import { UseCase } from '@/lib/core/definitions';
import { PageDTO } from '../dtos';
import { PageGateway } from '../gateways';
import { PageNotFoundError } from './PageNotFoundError';

interface GetPageRequestDTO {
  slug: string;
}

export class GetPageUseCase implements UseCase<GetPageRequestDTO, PageDTO> {
  constructor(private pageGateway: PageGateway) {}

  async execute(request: GetPageRequestDTO): Promise<PageDTO> {
    try {
      const page = await this.pageGateway.getPage(request.slug);

      return {
        id: page.id,
        components: page.components,
        description: page.description,
        slug: page.slug,
        title: page.title,
      };
    } catch (e) {
      throw new PageNotFoundError(e);
    }
  }
}
