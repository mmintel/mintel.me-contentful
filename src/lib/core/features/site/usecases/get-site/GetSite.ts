import { SiteDTO } from '../../dtos';
import { SiteGateway } from '../../gateways';
import { GetSiteUseCase } from './GetSiteUseCase';
import { SiteNotFoundError } from './SiteNotFoundError';

export class GetSite implements GetSiteUseCase {
  constructor(private siteGateway: SiteGateway) {}

  async execute(): Promise<SiteDTO> {
    try {
      const site = await this.siteGateway.getSite();

      return {
        id: site.id,
        title: site.title,
        logo: site.logo,
      };
    } catch (e) {
      throw new SiteNotFoundError(e);
    }
  }
}
