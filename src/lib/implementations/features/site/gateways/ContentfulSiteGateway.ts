import { Site } from '@/lib/core/features/site/domain';
import { SiteGateway } from '@/lib/core/features/site/gateways';
import {
  ContentfulCollection,
  ContentfulGateway,
  ContentfulRecord,
  ContentfulAsset,
} from '@/lib/implementations/gateways';
import { SiteQuery } from './queries/SiteQuery';

export interface ContentfulSiteResponse {
  siteCollection: ContentfulCollection<ContentfulSite>;
}

export interface ContentfulSite extends ContentfulRecord {
  title: string;
  logo: ContentfulAsset;
}

export class ContentfulSiteGateway extends ContentfulGateway
  implements SiteGateway {
  async getSite(): Promise<Site> {
    const response = await this.request<ContentfulSiteResponse>(SiteQuery);

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
