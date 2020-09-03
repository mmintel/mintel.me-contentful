import { UseCase, Result } from '@/core/definitions';
import { Navigation } from '@/core/domains/navigation/entities';
import { NavigationGateway } from '@/core/domains/navigation/gateways';
import { GetNavigationResponseDTO } from '../../../domains/navigation/dtos/GetNavigationResponseDTO';
import { GetNavigationRequestDTO } from '../../../domains/navigation/dtos/GetNavigationRequestDTO';

export class GetNavigationUseCase extends UseCase {
  constructor(private navigationGateway: NavigationGateway) {}

  async execute(
    request: GetNavigationRequestDTO,
  ): Promise<GetNavigationResponseDTO> {
    const navigation = await this.navigationGateway.getNavigation(request.name);
    return Result.ok<Navigation>(navigation);
  }
}
