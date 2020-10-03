import { DomainMapper } from '@/core/definitions/DomainMapper';
import { PageComponent } from '../../../domain/PageComponent';
import { ContentfulPageComponentDTO } from '../dtos/ContentfulPageDTO';

export class ContentfulPageComponentMapper
  implements DomainMapper<PageComponent> {
  constructor(private contentfulPageComponent: ContentfulPageComponentDTO) {}

  toDomain(): PageComponent {
    return new PageComponent({
      id: this.contentfulPageComponent.sys.id,
      type: this.contentfulPageComponent.__typename,
    });
  }
}
