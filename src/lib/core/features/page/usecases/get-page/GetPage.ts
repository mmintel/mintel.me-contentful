import { Page } from '../../domain';
import { PageGateway } from '../../gateways';
import { GetPageRequestDTO } from './GetPageRequestDTO';
import { GetPageUseCase } from './GetPageUseCase';
import { PageNotFoundError } from './PageNotFoundError';

export class GetPage implements GetPageUseCase {
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
