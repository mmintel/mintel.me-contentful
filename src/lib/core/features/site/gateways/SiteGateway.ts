import { Locale } from '@/lib/core/domain';
import { SiteDTO } from '../dtos';

export interface SiteGateway {
  getSite(locale: Locale): Promise<SiteDTO>;
}
