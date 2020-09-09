import { UseCase, Result } from '@/lib/abstract/definitions';
import {
  Navigation,
  NavigationName,
} from '@/lib/abstract/features/navigation/domain';
import { NavigationGateway } from '@/lib/abstract/features/navigation/gateways';
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
