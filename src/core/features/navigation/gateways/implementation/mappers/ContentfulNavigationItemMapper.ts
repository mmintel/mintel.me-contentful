import { NavigationItem } from '@/core/features/navigation/domain';
import { Page } from '@/core/features/page/domain';
import { ContentfulPageMapper } from '@/core/features/page/gateways/implementation/mappers';
import { ContentfulNavigationItemDTO } from '../dtos';

export class ContentfulNavigationItemMapper {
  constructor(private contentfulNavigationItem: ContentfulNavigationItemDTO) {}

  toDomain(): NavigationItem {
    let page: Page | undefined;

    if (this.contentfulNavigationItem.page) {
      const mapper = new ContentfulPageMapper(
        this.contentfulNavigationItem.page,
      );
      page = mapper.toDomain();
    }

    return new NavigationItem({
      id: this.contentfulNavigationItem.sys.id,
      title: this.contentfulNavigationItem.title,
      internal: this.contentfulNavigationItem.internal,
      url: this.contentfulNavigationItem.url,
      page,
    });
  }
}
