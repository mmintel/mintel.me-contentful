import { Navigation, NavigationName } from '@/app/features/navigation/domain';

export interface NavigationGateway {
  getNavigation(name: NavigationName): Promise<Navigation>;
}
