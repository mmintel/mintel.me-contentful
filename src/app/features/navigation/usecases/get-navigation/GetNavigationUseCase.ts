import { UseCase, Result } from '@/app/shared/core';
import { Navigation } from '../../domain';
import { NavigationGateway } from '../../gateways';
import { GetNavigationRequestDTO } from './GetNavigationRequestDTO';
import { NavigationNotFoundError } from './NavigationNotFoundError';

export class GetNavigationUseCase
  implements UseCase<GetNavigationRequestDTO, Result<Navigation>> {
  constructor(private navigationGateway: NavigationGateway) {}

  async execute(request: GetNavigationRequestDTO) {
    try {
      const navigation = await this.navigationGateway.getNavigation(
        request.name,
      );
      return Result.ok<Navigation>(navigation);
    } catch (e) {
      return Result.fail<Navigation, NavigationNotFoundError>(
        new NavigationNotFoundError(e),
      );
    }
  }
}
