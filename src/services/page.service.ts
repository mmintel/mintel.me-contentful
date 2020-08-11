import { ApiClient } from '@/lib/api';
import { Record, Page, Locale, PageTeaser } from '@/models';

export class PageService {
  constructor(private apiClient: ApiClient) {}

  public async getPage(slug: string, locale: Locale): Promise<Record<Page>> {
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
