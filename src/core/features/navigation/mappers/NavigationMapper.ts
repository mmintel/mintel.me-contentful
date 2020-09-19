import { Navigation } from '../domain';
import { NavigationDTO } from '../dtos';

export class NavigationMapper {
  constructor(private navigation: Navigation) {}

  toDTO(): NavigationDTO {
    return {
      id: this.navigation.id,
      items: this.navigation.items,
      name: this.navigation.name,
      title: this.navigation.title,
    };
  }
}
