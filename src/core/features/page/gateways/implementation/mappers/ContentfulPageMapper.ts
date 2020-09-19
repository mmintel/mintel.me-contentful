import { Page } from '@/core/features/page/domain';
import { ContentfulPageDTO } from '../dtos/ContentfulPageDTO';

export class ContentfulPageMapper {
  constructor(private contentfulPage: ContentfulPageDTO) {}

  toDomain(): Page {
    return new Page({
      id: this.contentfulPage.sys.id,
      description: this.contentfulPage.description,
      slug: this.contentfulPage.slug,
      title: this.contentfulPage.title,
      components: this.contentfulPage.components,
    });
  }
}
