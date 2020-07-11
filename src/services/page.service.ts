import { ApiClient, ContentType } from '@/lib/api';
import { Record, Page } from '@/models';

export class PageService {
  constructor(private apiClient: ApiClient) {}

  public async getPage(slug: string): Promise<Record<Page>> {
    const item = await this.apiClient.getOne<Page>({
      type: ContentType.page,
      levels: 2,
      fields: {
        slug: this.sanitizeSlug(slug),
      },
    });

    return item;
  }

  public async getPages(): Promise<Record<Page>[]> {
    return this.apiClient.getMany<Page>({
      type: ContentType.page,
    });
  }

  private removeLeadingSlashes(str: string) {
    return str.replace(/^\/+/g, '');
  }

  private sanitizeSlug(path: string) {
    return this.removeLeadingSlashes(path);
  }
}
