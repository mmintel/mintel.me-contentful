import { DTOMapper } from '@/core/definitions/DTOMapper';
import { PageComponent } from '../domain/PageComponent';
import { PageComponentDTO } from '../dtos/PageComponentDTO';

export class PageComponentMapper implements DTOMapper<PageComponentDTO> {
  constructor(private pageComponent: PageComponent) {}

  toDTO(): PageComponentDTO {
    return {
      id: this.pageComponent.id,
      type: this.pageComponent.type,
      ...this.pageComponent.data,
    };
  }
}
