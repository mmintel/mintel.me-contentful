import { NavigationGateway } from '../../gateways';
import { GetNavigationRequestDTO } from './GetNavigationRequestDTO';
import { NavigationNotFoundError } from './NavigationNotFoundError';
import { GetNavigationUseCase } from './GetNavigationUseCase';
import { Navigation } from '../../domain';

export class GetNavigation implements GetNavigationUseCase {
  constructor(private navigationGateway: NavigationGateway) {}

  async execute(request: GetNavigationRequestDTO): Promise<Navigation> {
    try {
      const navigation = await this.navigationGateway.getNavigation(
        request.name,
      );
      return navigation;
    } catch (e) {
      throw new NavigationNotFoundError(e);
    }
  }
}
