import { ApiClient, ContentType } from '../api/api';
import { Record, Page } from '../models';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';

@injectable()
export class PageService {
  @inject(TYPES.ApiClient) private apiClient!: ApiClient;

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
