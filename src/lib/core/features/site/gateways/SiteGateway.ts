import { SiteDTO } from '../dtos';

export interface SiteGateway {
  getSite(): Promise<SiteDTO>;
}
