import { Navigation, NavigationName } from '@/lib/features/navigation/domain';

export interface NavigationGateway {
  getNavigation(name: NavigationName): Promise<Navigation>;
}
