import { Logger } from "tslog";

import { Locale } from '@/core/domain';
import { Site } from '@/core/features/site/domain';
import { SiteGateway } from '@/core/features/site/gateways';
import { GraphqlService } from '@/core/services';
import { ContentfulSiteResponseDTO } from './dtos';
import { ContentfulSiteMapper } from './mappers';
import { SiteQuery } from './queries/SiteQuery';

export class ContentfulSiteGateway implements SiteGateway {
  private logger: Logger = new Logger({ name: "ContentfulSiteGateway" });

  constructor(private graphqlService: GraphqlService) {}

  async getSite(locale: Locale): Promise<Site> {
    const response = await this.graphqlService.request<
      ContentfulSiteResponseDTO
    >(SiteQuery, {
      locale,
    });

    if (!response) {
      this.logger.error(response);
      throw new Error('No site found.');
    }

    this.logger.debug('Received response', response);

    const contentfulSite = response.siteCollection.items[0];
    const mapper = new ContentfulSiteMapper(contentfulSite);

    return mapper.toDomain();
  }
}
