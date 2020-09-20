import { Site } from '../../domain';
import { SiteGateway } from '../../gateways';
import { GetSiteRequestDTO } from './GetSiteRequestDTO';
import { GetSiteUseCase } from './GetSiteUseCase';
import { SiteNotFoundError } from './SiteNotFoundError';

export class GetSite implements GetSiteUseCase {
  constructor(private siteGateway: SiteGateway) {}

  async execute(request: GetSiteRequestDTO): Promise<Site> {
    try {
      const site = await this.siteGateway.getSite(request.locale);
      return site;
    } catch (e) {
      throw new SiteNotFoundError(e);
    }
  }
}
