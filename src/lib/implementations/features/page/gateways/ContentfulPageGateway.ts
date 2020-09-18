import { PageGateway } from '@/lib/core/features/page/gateways';
import { PageQuery } from './queries/PageQuery';
import { Page } from '@/lib/core/features/page/domain';
import { ContentfulGateway } from '@/lib/implementations/gateways';
import { AllPagesQuery } from './queries/AllPagesQuery';
import { ContentfulPageResponseDTO } from '../dtos/ContentfulPageResponseDTO';
import { ContentfulPageMapper } from '../mappers';

export class ContentfulPageGateway extends ContentfulGateway
  implements PageGateway {
  async getPage(slug: string): Promise<Page> {
    const response = await this.request<ContentfulPageResponseDTO>(PageQuery, {
      slug,
    });

    if (!response) {
      throw new Error('No page found.');
    }

    const contentfulPage = response.pageCollection.items[0];
    const mapper = new ContentfulPageMapper(contentfulPage);

    return mapper.toDomain();
  }

  async getAllPages(): Promise<Page[]> {
    const response = await this.request<ContentfulPageResponseDTO>(
      AllPagesQuery,
    );

    return response.pageCollection.items.map(contentfulPage => {
      const mapper = new ContentfulPageMapper(contentfulPage);
      return mapper.toDomain();
    });
  }
}
