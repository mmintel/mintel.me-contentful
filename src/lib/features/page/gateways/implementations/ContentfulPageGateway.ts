import { PageGateway } from '@/lib/features/page/gateways';
import PageQuery from './queries/PageQuery.gql';
import { Logger } from '@/lib/shared/utils';
import { ContentfulService } from '@/lib/shared/services';

interface ContentfulPageResponse {
  pageCollection: {
    items: ContentfulPage[];
  };
}

interface ContentfulPage {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  name: string;
}

export class ContentfulPageGateway implements PageGateway {
  constructor(
    private logger: Logger,
    private contentfulService: ContentfulService,
  ) {}

  async getPage(slug: string) {
    const response = await this.contentfulService.getCollection<
      ContentfulPageResponse
    >(PageQuery, {
      slug,
    });

    if (!response) {
      this.logger.error('WTF, no page.');
      throw new Error('No page found.');
    }

    this.logger.debug('Received page response', response);
    const page = response.pageCollection.items[0];

    return new PageModel(page);
  }
}
