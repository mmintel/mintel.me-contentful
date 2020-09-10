import { UseCase, Result } from '@/lib/shared/core';
import { Navigation } from '../../domain';
import { NavigationGateway } from '../../gateways';
import { GetNavigationRequestDTO } from './GetNavigationRequestDTO';
import { NavigationNotFoundError } from './NavigationNotFoundError';

export class GetNavigationUseCase
  implements UseCase<GetNavigationRequestDTO, Result<Navigation>> {
  constructor(private navigationGateway: NavigationGateway) {}

  async execute(request: GetNavigationRequestDTO) {
    const navigation = await this.navigationGateway.getNavigation(request.name);

    if (!navigation) {
      return Result.fail<Navigation, NavigationNotFoundError>(
        new NavigationNotFoundError('Could not find navigation.'),
      );
    }

    return Result.ok<Navigation>(navigation);
  }
}
