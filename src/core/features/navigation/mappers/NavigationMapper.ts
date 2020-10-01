import { DTOMapper } from '@/core/definitions/DTOMapper';
import { Navigation } from '../domain';
import { NavigationDTO } from '../dtos';
import { NavigationItemMapper } from './NavigationItemMapper';

export class NavigationMapper implements DTOMapper<NavigationDTO> {
  constructor(private navigation: Navigation) {}

  toDTO(): NavigationDTO {
    return {
      id: this.navigation.id,
      name: this.navigation.name,
      title: this.navigation.title,
      items: this.navigation.items.map((item) => {
        const mapper = new NavigationItemMapper(item);
        return mapper.toDTO();
      }),
    };
  }
}
