import { UseCase } from '@/lib/core/definitions';
import { Navigation } from '../../domain';
import { NavigationGateway } from '../../gateways';
import { GetNavigationRequestDTO } from './GetNavigationRequestDTO';
import { NavigationNotFoundError } from './NavigationNotFoundError';

export class GetNavigationUseCase
  implements UseCase<GetNavigationRequestDTO, Navigation> {
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
