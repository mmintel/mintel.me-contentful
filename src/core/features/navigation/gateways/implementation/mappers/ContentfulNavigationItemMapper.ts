import { NavigationItem } from '@/core/features/navigation/domain';
import { ContentfulNavigationItemDTO } from '../dtos';

export class ContentfulNavigationItemMapper {
  constructor(private contentfulNavigationItem: ContentfulNavigationItemDTO) {}

  toDomain(): NavigationItem {
    return new NavigationItem({
      id: this.contentfulNavigationItem.sys.id,
      title: this.contentfulNavigationItem.title,
      internal: this.contentfulNavigationItem.internal,
      url: this.contentfulNavigationItem.url,
      page: this.contentfulNavigationItem.page?.slug,
    });
  }
}
