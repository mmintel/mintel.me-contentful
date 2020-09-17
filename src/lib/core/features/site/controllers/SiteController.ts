import { SiteDTO } from '../dtos';
import { GetSiteUseCase } from '../usecases';

export class SiteController {
  constructor(private getSiteUseCase: GetSiteUseCase) {}

  async getSite(): Promise<SiteDTO> {
    return this.getSiteUseCase.execute();
  }
}
