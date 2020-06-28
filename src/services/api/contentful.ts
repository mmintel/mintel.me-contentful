/* eslint-disable @typescript-eslint/camelcase */

import { ApiClient } from './api-client';
import { Page } from '../../models/page';
import * as contentful from 'contentful';
import { Logger, createLogger } from '../../utils/logger';

interface Options {
  space: string;
  accessToken: string;
  preview?: boolean;
}

export class PageNotFoundError extends Error {
  name = 'PageNotFoundError';
}

export class Contentful implements ApiClient {
  private logger: Logger = createLogger('Contentful');
  private client: contentful.ContentfulClientApi;

  constructor(options: Options) {
    this.client = contentful.createClient({
      space: options.space,
      accessToken: options.accessToken,
      host: options.preview ? 'preview.contentful.com' : 'cdn.contentful.com',
    });
  }

  public async getPage(path: string): Promise<Page> {
    const payload = {
      content_type: 'page',
      include: 2,
      'fields.slug': this.sanitizePath(path),
    };

    this.logger.trace('Looking up entry with payload', payload);

    const entry = await this.client.getEntries<Page>(payload);

    this.logger.trace('Received entry', entry);

    const item = entry.items[0];
    if (!item) throw new PageNotFoundError('Could not find page.');

    return this.contentfulEntryToPage(item);
  }

  public async getPages(): Promise<Page[]> {
    const entries = await this.client.getEntries<Page>({
      content_type: 'page',
    });

    this.logger.info('Received entries', entries);

    return entries.items.map(item => item && this.contentfulEntryToPage(item));
  }

  private sanitizePath(path: string) {
    return this.removeLeadingSlashes(path);
  }

  private removeLeadingSlashes(str: string) {
    return str.replace(/^\/+/g, '');
  }

  private contentfulEntryToPage(item: contentful.Entry<Page>): Page {
    return {
      createdAt: item.sys.createdAt,
      updatedAt: item.sys.updatedAt,
      ...item.fields,
    };
  }
}
