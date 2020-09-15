import { PageGateway } from '@/lib/core/features/page/gateways';
import { PageQuery } from './queries/PageQuery';
import { Page } from '@/lib/core/features/page/domain';
import { PageDTO } from '@/lib/core/features/page/dtos';
import {
  ContentfulCollectionDTO,
  ContentfulRecordDTO,
} from '@/lib/implementations/dtos';
import { GraphqlService } from '@/lib/core/services';

interface ContentfulPageResponse {
  pageCollection: ContentfulCollectionDTO<ContentfulPage>;
}

interface ContentfulPage extends ContentfulRecordDTO {
  id: string;
  title: string;
  slug: string;
  description: string;
  components: {
    json: any;
  };
}

export class ContentfulPageGateway implements PageGateway {
  constructor(private graphqlService: GraphqlService) {}

  async getPage(slug: string): Promise<PageDTO> {
    const response = await this.graphqlService.request<ContentfulPageResponse>(
      PageQuery,
      {
        slug,
      },
    );

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
