import { NavigationGateway } from '../../gateways';
import { GetNavigationRequest } from './GetNavigationRequest';
import { NavigationNotFoundError } from './NavigationNotFoundError';
import { GetNavigationUseCase } from './GetNavigationUseCase';
import { Navigation } from '../../domain';

export class GetNavigation implements GetNavigationUseCase {
  constructor(private navigationGateway: NavigationGateway) {}

  async execute(request: GetNavigationRequest): Promise<Navigation> {
    try {
      const navigation = await this.navigationGateway.getNavigation(
        request.locale,
        request.name,
      );
      return navigation;
    } catch (e) {
      throw new NavigationNotFoundError(e);
    }
  }
}
