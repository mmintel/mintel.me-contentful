import { Navigation, NavigationName } from '@/core/features/navigation/domain';

export interface NavigationGateway {
  getNavigation(locale: string, name: NavigationName): Promise<Navigation>;
}
