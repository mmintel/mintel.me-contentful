import { NavigationGateway } from '../../gateways';
import { NavigationDTO } from '../../dtos';
import { GetNavigationRequestDTO } from './GetNavigationRequestDTO';
import { NavigationNotFoundError } from './NavigationNotFoundError';
import { GetNavigationUseCase } from './GetNavigationUseCase';

export class GetNavigation implements GetNavigationUseCase {
  constructor(private navigationGateway: NavigationGateway) {}

  async execute(request: GetNavigationRequestDTO): Promise<NavigationDTO> {
    try {
      const navigation = await this.navigationGateway.getNavigation(
        request.name,
      );

      return {
        id: navigation.id,
        items: navigation.items,
        name: navigation.name,
        title: navigation.title,
      };
    } catch (e) {
      throw new NavigationNotFoundError(e);
    }
  }
}
