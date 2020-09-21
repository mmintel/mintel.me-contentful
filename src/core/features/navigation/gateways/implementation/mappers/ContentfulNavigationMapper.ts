import { Navigation, NavigationItem } from '@/core/features/navigation/domain';
import { ContentfulNavigationDTO } from '../dtos';
import { ContentfulNavigationItemMapper } from './ContentfulNavigationItemMapper';

export class ContentfulNavigationMapper {
  constructor(private contentfulNavigation: ContentfulNavigationDTO) {}

  toDomain(): Navigation {
    let items: NavigationItem[] = [];

    if (this.contentfulNavigation.itemsCollection) {
      items = this.contentfulNavigation.itemsCollection.items.map((item) => {
        const mapper = new ContentfulNavigationItemMapper(item);
        return mapper.toDomain();
      });
    }

    return new Navigation({
      id: this.contentfulNavigation.sys.id,
      title: this.contentfulNavigation.title,
      name: this.contentfulNavigation.name,
      items,
    });
  }
}
