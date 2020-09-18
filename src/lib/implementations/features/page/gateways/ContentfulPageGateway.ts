import { PageGateway } from '@/lib/core/features/page/gateways';
import { PageQuery } from './queries/PageQuery';
import { Page } from '@/lib/core/features/page/domain';
import { AllPagesQuery } from './queries/AllPagesQuery';
import { ContentfulPageResponseDTO } from '../dtos/ContentfulPageResponseDTO';
import { ContentfulPageMapper } from '../mappers';
import { GraphqlService } from '@/lib/core/services';
import { Locale } from '@/lib/core/domain';

export class ContentfulPageGateway implements PageGateway {
  constructor(private graphqlService: GraphqlService) {}

  async getPage(locale: Locale, slug: string): Promise<Page> {
    const response = await this.graphqlService.request<
      ContentfulPageResponseDTO
    >(PageQuery, {
      locale,
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
    const response = await this.graphqlService.request<
      ContentfulPageResponseDTO
    >(AllPagesQuery);

    return response.pageCollection.items.map(contentfulPage => {
      const mapper = new ContentfulPageMapper(contentfulPage);
      return mapper.toDomain();
    });
  }
}
