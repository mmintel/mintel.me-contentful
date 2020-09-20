import { Logger, createLogger } from '@/core/utils';

import { Site } from '@/core/features/site/domain';
import { SiteGateway } from '@/core/features/site/gateways';
import { GraphqlService } from '@/core/services';
import { ContentfulSiteResponseDTO } from './dtos';
import { ContentfulSiteMapper } from './mappers';
import { SiteQuery } from './queries/SiteQuery';

export class ContentfulSiteGateway implements SiteGateway {
  private logger: Logger = createLogger('ContentfulSiteGateway');

  constructor(private graphqlService: GraphqlService) {}

  async getSite(locale: string): Promise<Site> {
    const response = await this.graphqlService.request<
      ContentfulSiteResponseDTO
    >(SiteQuery, {
      locale,
    });

    if (!response) {
      throw new Error('No site found.');
    }

    this.logger.debug('Received response', response);

    const contentfulSite = response.siteCollection.items[0];
    const mapper = new ContentfulSiteMapper(contentfulSite);

    return mapper.toDomain();
  }
}
