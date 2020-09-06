import { UseCase } from '@/core/definitions/UseCase';
import { Result } from '@/core/definitions/Result';
import { Navigation } from '@/core/domain/Navigation';
import { NavigationName } from '@/core/domain/NavigationName';
import { NavigationGateway } from '@/core/gateways';
import { NavigationNotFoundError } from './NavigationNotFoundError';

interface GetNavigationRequestDTO {
  name: NavigationName;
}

export class GetNavigationUseCase
  implements UseCase<GetNavigationRequestDTO, Result<Navigation>> {
  constructor(private navigationGateway: NavigationGateway) {}

  async execute(request: GetNavigationRequestDTO) {
    const response = await this.navigationGateway.getNavigation(request.name);

    if (!response) {
      return Result.fail<Navigation, NavigationNotFoundError>(
        new NavigationNotFoundError('Could not find navigation.'),
      );
    }

    const navigation = new Navigation(response);
    return Result.ok<Navigation>(navigation);
  }
}
