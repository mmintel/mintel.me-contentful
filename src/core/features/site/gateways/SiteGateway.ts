import { Site } from '../domain';

export interface SiteGateway {
  getSite(locale: string): Promise<Site>;
}
