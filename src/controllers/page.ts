import { ApiService } from '@/services';
import { Page, Locale, PageTeaser } from '@/value-objects';

export class PageController {
  constructor(private apiClient: ApiService) {}

  public async getPage(slug: string, locale: Locale): Promise<Page> {
    const item = await this.apiClient.getPage(slug, locale);

    return item;
  }

  public async getAllPages(locale: Locale): Promise<PageTeaser[]> {
    return this.apiClient.getAllPages(locale);
  }

  private removeLeadingSlashes(str: string) {
    return str.replace(/^\/+/g, '');
  }

  private sanitizeSlug(path: string) {
    return this.removeLeadingSlashes(path);
  }
}
