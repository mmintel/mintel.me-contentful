import {
  Navigation,
  NavigationName,
} from '@/lib/abstract/features/navigation/domain';

export interface NavigationGateway {
  getNavigation(name: NavigationName): Promise<Navigation>;
}
