import { DomainMapper } from '@/core/definitions/DomainMapper';
import { Page } from '@/core/features/page/domain';
import { ContentfulPageDTO } from '../dtos/ContentfulPageDTO';
import { ContentfulPageComponentMapper } from './ContentfulPageComponentMapper';

export class ContentfulPageMapper implements DomainMapper<Page> {
  constructor(private contentfulPage: ContentfulPageDTO) {}

  toDomain(): Page {
    return new Page({
      id: this.contentfulPage.sys.id,
      description: this.contentfulPage.description,
      slug: this.contentfulPage.slug,
      title: this.contentfulPage.title,
      parentID: this.contentfulPage.parent?.sys.id,
      components: this.contentfulPage.componentsCollection.items.map((item) => {
        const mapper = new ContentfulPageComponentMapper(item);
        return mapper.toDomain();
      }),
    });
  }
}
