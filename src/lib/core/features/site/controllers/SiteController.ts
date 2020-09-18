import { LocaleParser } from '@/lib/core/utils';
import { SiteDTO } from '../dtos';
import { GetSiteUseCase } from '../usecases';

export class SiteController {
  constructor(private getSiteUseCase: GetSiteUseCase) {}

  async getSite(locale: string): Promise<SiteDTO> {
    const localeParser = new LocaleParser(locale);
    return this.getSiteUseCase.execute({
      locale: localeParser.parse(),
    });
  }
}
