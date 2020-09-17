import { PageDTO } from '../../dtos';
import { PageGateway } from '../../gateways';
import { GetPageRequestDTO } from './GetPageRequestDTO';
import { GetPageUseCase } from './GetPageUseCase';
import { PageNotFoundError } from './PageNotFoundError';

export class GetPage implements GetPageUseCase {
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
