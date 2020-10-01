import { PageGateway } from '@/core/features/page/gateways';
import { Page } from '@/core/features/page/domain';
import { GraphqlService } from '@/core/services';
import { PageQuery } from './queries/PageQuery';
import { AllPagesQuery } from './queries/AllPagesQuery';
import { ContentfulPageResponseDTO } from './dtos/ContentfulPageResponseDTO';
import { ContentfulPageMapper } from './mappers';
import { createLogger, Logger } from '@/core/utils';

export class ContentfulPageGateway implements PageGateway {
  private logger: Logger = createLogger('ContentfulPageGateway');

  constructor(private graphqlService: GraphqlService) {}

  private async requestWithParents(
    locale: string,
    slug: string,
    child?: Page,
  ): Promise<Page> {
    let response;

    try {
      response = await this.graphqlService.request<ContentfulPageResponseDTO>(
        PageQuery,
        {
          locale,
          slug,
        },
      );
    } catch (e) {
      this.logger.error('Something went wrong requesting a page.');
      throw new Error(e);
    }

    if (!response) {
      throw new Error(`No page found with slug: "${slug}".`);
    }

    const contentfulPage = response.pageCollection.items[0];
    const mapper = new ContentfulPageMapper(contentfulPage);
    let page = mapper.toDomain();

    if (child) {
      child.addGeneration(page);
      page = child;
    }

    if (!contentfulPage.parent) {
      return page;
    }

    return this.requestWithParents(
      locale,
      contentfulPage.parent.slug,
      page || child,
    );
  }

  async getPage(locale: string, slug: string): Promise<Page> {
    return this.requestWithParents(locale, slug);
  }

  async getAllPages(locale: string): Promise<Page[]> {
    const response = await this.graphqlService.request<
      ContentfulPageResponseDTO
    >(AllPagesQuery, {
      locale,
    });

    return response.pageCollection.items.map((contentfulPage) => {
      const mapper = new ContentfulPageMapper(contentfulPage);
      return mapper.toDomain();
    });
  }
}
