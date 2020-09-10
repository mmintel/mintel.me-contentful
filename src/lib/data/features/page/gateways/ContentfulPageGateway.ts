import { PageGateway } from '@/lib/core/features/page/gateways';
import { DataService } from '@/lib/core/services';
import PageQuery from './queries/PageQuery.gql';
import { Logger } from '@/lib/core/utils';
import { PageModel } from '../models/Page';

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
  constructor(private logger: Logger, private dataService: DataService) {}

  async getPage(slug: string) {
    const response = await this.dataService.getCollection<
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
