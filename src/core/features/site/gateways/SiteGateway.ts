import { Locale } from '@/core/domain';
import { Site } from '../domain';

export interface SiteGateway {
  getSite(locale: Locale): Promise<Site>;
}
