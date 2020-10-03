import { DTOMapper } from '@/core/definitions/DTOMapper';
import { PageMapper } from '../../page/mappers';
import { NavigationItem } from '../domain';
import { NavigationItemDTO } from '../dtos';

export class NavigationItemMapper implements DTOMapper<NavigationItemDTO> {
  constructor(private navigationItem: NavigationItem) {}

  toDTO(): NavigationItemDTO {
    let page = null;

    if (this.navigationItem.page) {
      const mapper = new PageMapper(this.navigationItem.page);
      console.log('MAPPED PAGE', mapper.toDTO());

      page = mapper.toDTO();
    }

    return {
      id: this.navigationItem.id,
      internal: this.navigationItem.internal,
      title: this.navigationItem.title,
      url: this.navigationItem.url || null,
      page,
    };
  }
}
