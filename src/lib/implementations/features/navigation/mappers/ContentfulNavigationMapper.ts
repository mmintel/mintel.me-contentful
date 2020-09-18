import { Navigation } from '@/lib/core/features/navigation/domain';
import { ContentfulNavigationDTO } from '../dtos';

export class ContentfulNavigationMapper {
  constructor(private contentfulNavigation: ContentfulNavigationDTO) {}

  toDomain(): Navigation {
    return new Navigation({
      id: this.contentfulNavigation.sys.id,
      title: this.contentfulNavigation.title,
      name: this.contentfulNavigation.name,
      items: this.contentfulNavigation.itemsCollection.items.map(
        contentfulNavigationItem => ({
          id: contentfulNavigationItem.sys.id,
          title: contentfulNavigationItem.title,
          internal: contentfulNavigationItem.internal,
          url: contentfulNavigationItem.url,
          page: {
            slug: contentfulNavigationItem.page.slug,
          },
        }),
      ),
    });
  }
}
