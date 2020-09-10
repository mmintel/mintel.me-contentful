import { UseCase, Result } from '@/lib/core/definitions';
import {
  Navigation,
  NavigationName,
} from '@/lib/core/features/navigation/domain';
import { NavigationGateway } from '@/lib/core/features/navigation/gateways';
import { NavigationNotFoundError } from './NavigationNotFoundError';

interface GetNavigationRequestDTO {
  name: NavigationName;
}

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
