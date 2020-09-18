import { Locale } from '@/lib/core/domain';
import { Site } from '@/lib/core/features/site/domain';
import { SiteGateway } from '@/lib/core/features/site/gateways';
import { GraphqlService } from '@/lib/core/services';
import { ContentfulSiteResponseDTO } from '../dtos';
import { SiteQuery } from './queries/SiteQuery';

export class ContentfulSiteGateway implements SiteGateway {
  constructor(private graphqlService: GraphqlService) {}

  async getSite(locale: Locale): Promise<Site> {
    const response = await this.graphqlService.request<
      ContentfulSiteResponseDTO
    >(SiteQuery, {
      locale,
    });

    if (!response) {
      throw new Error('No site found.');
    }

    const rawLogo = response.siteCollection.items[0];
    const logo = new Site({
      id: rawLogo.sys.id,
      title: rawLogo.title,
      logo: rawLogo.logo.url,
    });

    return logo;
  }
}
