import { Navigation } from '../../../domain';
import { ContentfulNavigationDTO } from '../dtos';

export class ContentfulNavigationMapper {
  constructor(private contentfulNavigation: ContentfulNavigationDTO) {}

  toDomain(): Navigation {
    return new Navigation({
      id: this.contentfulNavigation.sys.id,
      title: this.contentfulNavigation.title,
      name: this.contentfulNavigation.name,
      itemIDs: this.contentfulNavigation.itemsCollection.items.map(
        (i) => i.sys.id,
      ),
    });
  }
}
