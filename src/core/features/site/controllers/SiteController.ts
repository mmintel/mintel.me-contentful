import { SiteDTO } from '../dtos';
import { SiteMapper } from '../mappers';
import { GetSiteUseCase } from '../usecases';

export class SiteController {
  constructor(private getSiteUseCase: GetSiteUseCase) {}

  async getSite(locale: string): Promise<SiteDTO> {
    const site = await this.getSiteUseCase.execute({
      locale,
    });
    const mapper = new SiteMapper(site);
    return mapper.toDTO();
  }
}
