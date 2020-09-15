import { NavigationName } from '../domain';
import { NavigationDTO } from '../dtos';
import { NavigationGateway } from '../gateways';
import { GetNavigationUseCase } from '../usecases';

export class NavigationController {
  private getNavigationUseCase: GetNavigationUseCase;

  constructor(navigationGateway: NavigationGateway) {
    this.getNavigationUseCase = new GetNavigationUseCase(navigationGateway);
  }

  async getMainNavigation(): Promise<NavigationDTO> {
    const navigation = await this.getNavigationUseCase.execute({
      name: NavigationName.MAIN_NAVIGATION,
    });
    return navigation;
  }
}
