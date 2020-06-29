import { ApiClient, ContentType } from '../api';
import { Page } from './page.interfaces';

export class PageNotFoundError extends Error {
  name = 'PageNotFoundError';
}

export class PageService {
  constructor(private apiClient: ApiClient) {}

  public async getPage(slug: string): Promise<Page> {
    const item = await this.apiClient.getOne<Page>({
      content_type: ContentType.page,
      include: 2,
      'fields.slug': this.sanitizeSlug(slug),
    });

    if (!item) throw new PageNotFoundError('Could not find page.');

    return item;
  }

  public async getPages(): Promise<Page[]> {
    return this.apiClient.getMany<Page>({
      content_type: ContentType.page,
    });
  }

  private removeLeadingSlashes(str: string) {
    return str.replace(/^\/+/g, '');
  }

  private sanitizeSlug(path: string) {
    return this.removeLeadingSlashes(path);
  }
}
