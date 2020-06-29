/* eslint-disable @typescript-eslint/camelcase */

import { ApiClient, Query } from './api-client';
import * as contentful from 'contentful';
import { Logger, createLogger } from '../../utils/logger';

interface ContentfulQuery {
  [key: string]: any;
  content_type?: string;
  include?: number;
}

interface Options {
  space: string;
  accessToken: string;
  preview?: boolean;
}

interface Record {
  createdAt: string;
  updatedAt: string;
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

  private async getEntries<T>(
    query: Query & ContentfulQuery,
  ): Promise<contentful.EntryCollection<T>> {
    const entries = await this.client.getEntries<T>(query);
    return entries;
  }

  private getItem<T>(item: contentful.Entry<T>): T & Record {
    return {
      createdAt: item.sys.createdAt,
      updatedAt: item.sys.updatedAt,
      ...item.fields,
    };
  }

  public async getMany<T>(query: Query): Promise<(T & Record)[]> {
    this.logger.trace('Looking up entry with query', query);
    const entries = await this.getEntries<T>(query);
    const items = entries.items.map(this.getItem);
    return items;
  }

  public async getOne<T>(query: Query): Promise<T & Record> {
    const items = await this.getMany<T>({
      ...query,
      limit: 1,
    });
    return items[0];
  }
}
