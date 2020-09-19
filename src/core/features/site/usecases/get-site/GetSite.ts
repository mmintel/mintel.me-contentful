import { SiteDTO } from '../../dtos';
import { SiteGateway } from '../../gateways';
import { GetSiteRequestDTO } from './GetSiteRequestDTO';
import { GetSiteUseCase } from './GetSiteUseCase';
import { SiteNotFoundError } from './SiteNotFoundError';

export class GetSite implements GetSiteUseCase {
  constructor(private siteGateway: SiteGateway) {}

  async execute(request: GetSiteRequestDTO): Promise<SiteDTO> {
    try {
      const site = await this.siteGateway.getSite(request.locale);

      return {
        id: site.id,
        title: site.title,
        logo: site.logo,
        homepage: site.homepage,
      };
    } catch (e) {
      throw new SiteNotFoundError(e);
    }
  }
}
