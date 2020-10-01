import { DTOMapper } from '@/core/definitions/DTOMapper';
import { Page } from '../../page/domain';
import { NavigationItem } from '../domain';
import { NavigationItemDTO, PageTeaser } from '../dtos';

export class NavigationItemMapper implements DTOMapper<NavigationItemDTO> {
  constructor(private navigationItem: NavigationItem) {}

  private pageToDTO(page?: Page): PageTeaser | null {
    if (!page) return null;

    return {
      slug: page.slug,
      parent: this.pageToDTO(page.parent),
    };
  }

  toDTO(): NavigationItemDTO {
    return {
      id: this.navigationItem.id,
      internal: this.navigationItem.internal,
      title: this.navigationItem.title,
      url: this.navigationItem.url || null,
      page: this.pageToDTO(this.navigationItem.page),
    };
  }
}
