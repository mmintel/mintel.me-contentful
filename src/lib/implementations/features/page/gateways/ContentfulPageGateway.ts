import { PageGateway } from '@/lib/core/features/page/gateways';
import { PageQuery } from './queries/PageQuery';
import { Page } from '@/lib/core/features/page/domain';
import { PageDTO } from '@/lib/core/features/page/dtos';
import {
  ContentfulCollection,
  ContentfulRecord,
} from '@/lib/implementations/dtos';
import { ContentfulGateway } from '@/lib/implementations/gateways';

export interface ContentfulPageResponse {
  pageCollection: ContentfulCollection<ContentfulPage>;
}

export interface ContentfulPage extends ContentfulRecord {
  title: string;
  slug: string;
  description: string;
  components: {
    json: any;
  };
}

export class ContentfulPageGateway extends ContentfulGateway
  implements PageGateway {
  async getPage(slug: string): Promise<PageDTO> {
    const response = await this.request<ContentfulPageResponse>(PageQuery, {
      slug,
    });

    if (!response) {
      throw new Error('No page found.');
    }

    const rawPage = response.pageCollection.items[0];
    const page = new Page({
      id: rawPage.sys.id,
      description: rawPage.description,
      slug: rawPage.slug,
      title: rawPage.title,
      components: rawPage.components,
    });

    return page;
  }
}
