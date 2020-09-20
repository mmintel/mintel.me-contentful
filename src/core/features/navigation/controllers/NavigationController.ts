import { NavigationName } from '../domain';
import { NavigationDTO } from '../dtos';
import { NavigationMapper } from '../mappers';
import { GetNavigationUseCase } from '../usecases';

export class NavigationController {
  constructor(private getNavigation: GetNavigationUseCase) {}

  async getMainNavigation(locale: string): Promise<NavigationDTO> {
    const navigation = await this.getNavigation.execute({
      locale,
      name: NavigationName.MAIN_NAVIGATION,
    });
    const mapper = new NavigationMapper(navigation);
    return mapper.toDTO();
  }
}
