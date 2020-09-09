import { NavigationName } from '@/core/domain/Navigation';
import { GetNavigationResponseDTO } from '../dtos/GetNavigationResponseDTO';

export interface NavigationGateway {
  getNavigation(
    name: NavigationName,
  ): Promise<GetNavigationResponseDTO | undefined>;
}
