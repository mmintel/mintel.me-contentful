import { NavigationName } from '@/core/domain/NavigationName';
import { GetNavigationResponseDTO } from '../dtos/GetNavigationResponseDTO';

export interface NavigationGateway {
  getNavigation(
    name: NavigationName,
  ): Promise<GetNavigationResponseDTO | undefined>;
}
