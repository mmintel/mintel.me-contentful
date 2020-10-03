import { DomainMapper } from '@/core/definitions/DomainMapper';
import { PageComponent } from '../../../domain/PageComponent';
import { ContentfulPageComponentDTO } from '../dtos/ContentfulPageDTO';

export class ContentfulPageComponentMapper
  implements DomainMapper<PageComponent> {
  constructor(private contentfulPageComponent: ContentfulPageComponentDTO) {}

  toDomain(): PageComponent {
    const { sys, __typename, ...data } = this.contentfulPageComponent;
    return new PageComponent({
      id: sys.id,
      type: __typename,
      data,
    });
  }
}
