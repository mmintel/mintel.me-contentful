import { DomainMapper } from '@/core/definitions/DomainMapper';
import { Page } from '@/core/features/page/domain';
import { PageComponent } from '../../../domain/PageComponent';
import { ContentfulPageDTO } from '../dtos/ContentfulPageDTO';

export class ContentfulPageMapper implements DomainMapper<Page> {
  constructor(private contentfulPage: ContentfulPageDTO) {}

  toDomain(): Page {
    return new Page({
      id: this.contentfulPage.sys.id,
      description: this.contentfulPage.description,
      slug: this.contentfulPage.slug,
      title: this.contentfulPage.title,
      components: this.contentfulPage.componentsCollection.items.map(
        (item) =>
          new PageComponent({
            id: item.sys.id,
            type: item.__typename,
          }),
      ),
      parentID: this.contentfulPage.parent?.sys.id,
    });
  }
}
