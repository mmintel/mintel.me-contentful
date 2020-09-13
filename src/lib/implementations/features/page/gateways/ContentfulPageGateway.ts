import { PageGateway } from '@/lib/core/features/page/gateways';
import PageQuery from './queries/PageQuery.gql';
import { Logger } from '@/lib/implementations/utils';
import {
  ContentfulService,
  ContentfulCollection,
  ContentfulRecord,
} from '@/lib/implementations/services';
import { Page } from '@/lib/core/features/page/domain';

interface ContentfulPageResponse {
  pageCollection: ContentfulCollection<ContentfulPage>;
}

interface ContentfulPage extends ContentfulRecord {
  id: string;
  title: string;
  slug: string;
  description: string;
  components: {
    json: any;
  };
}

export class ContentfulPageGateway implements PageGateway {
  constructor(
    private logger: Logger,
    private contentfulService: ContentfulService,
  ) {}

  async getPage(slug: string) {
    const response = await this.contentfulService.request<
      ContentfulPageResponse
    >(PageQuery, {
      slug,
    });

    if (!response) {
      throw new Error('No page found.');
    }

    this.logger.debug('Received page response', response);
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
