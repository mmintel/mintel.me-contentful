import {
  Navigation,
  NavigationName,
} from '@/lib/core/features/navigation/domain';

export interface NavigationGateway {
  getNavigation(name: NavigationName): Promise<Navigation>;
}
