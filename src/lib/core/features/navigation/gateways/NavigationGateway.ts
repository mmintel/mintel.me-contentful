import { NavigationName } from '@/lib/core/features/navigation/domain';
import { NavigationDTO } from '../dtos';

export interface NavigationGateway {
  getNavigation(name: NavigationName): Promise<NavigationDTO>;
}
