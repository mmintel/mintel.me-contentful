import { Site } from '@/core/features/site/domain';
import { ContentfulSiteDTO } from '../dtos';

export class ContentfulSiteMapper {
  constructor(private contentfulSite: ContentfulSiteDTO) {}

  toDomain(): Site {
    return new Site({
      id: this.contentfulSite.sys.id,
      title: this.contentfulSite.title,
      logo: this.contentfulSite.logo.url,
      homepage: this.contentfulSite.homepage.slug,
    });
  }
}
