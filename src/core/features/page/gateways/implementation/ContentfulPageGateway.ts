import { PageGateway } from '@/core/features/page/gateways';
import { Page } from '@/core/features/page/domain';
import { GraphqlService } from '@/core/services';
import { PageByIdQuery } from './queries/PageByIdQuery';
import { PageBySlugQuery } from './queries/PageBySlugQuery';
import { AllPagesQuery } from './queries/AllPagesQuery';
import { ContentfulPageCollectionResponseDTO } from './dtos/ContentfulPageCollectionResponseDTO';
import { ContentfulPageMapper } from './mappers';
import { ContentfulPageTeaserDTO } from './dtos/ContentfulPageTeaserDTO';
import { Logger, createLogger } from '@/core/utils';
import { ContentfulPageResponseDTO } from './dtos/ContentfulPageResponseDTO';
import { ContentfulPageDTO } from './dtos/ContentfulPageDTO';

export class ContentfulPageGateway implements PageGateway {
  private logger: Logger = createLogger('ContentfulPageGateway');

  constructor(private graphqlService: GraphqlService) {}

  async getPageById(locale: string, id: string): Promise<Page> {
    const response = await this.graphqlService.request<
      ContentfulPageResponseDTO
    >(PageByIdQuery, {
      locale,
      id,
    });

    this.logger.debug('Got response from contentful', response);

    const contentfulPage = response.page;
    const domainModel = new ContentfulPageMapper(contentfulPage).toDomain();
    this.logger.debug('Mapped page to', domainModel);

    return domainModel;
  }

  async getPageBySlug(locale: string, slug: string): Promise<Page> {
    const response = await this.graphqlService.request<
      ContentfulPageCollectionResponseDTO<ContentfulPageDTO>
    >(PageBySlugQuery, {
      locale,
      slug,
    });

    this.logger.debug('Got response from contentful', response);

    const contentfulPage = response.pageCollection.items[0];

    if (!contentfulPage) {
      throw new Error('Contentful did not respond with a page.');
    }

    const domainModel = new ContentfulPageMapper(contentfulPage).toDomain();
    this.logger.debug('Mapped page to', domainModel);

    return domainModel;
  }

  async getAllPageSlugs(locale: string): Promise<string[]> {
    const response = await this.graphqlService.request<
      ContentfulPageCollectionResponseDTO<ContentfulPageTeaserDTO>
    >(AllPagesQuery, {
      locale,
    });

    return response.pageCollection.items.map((i) => i.slug);
  }
}
