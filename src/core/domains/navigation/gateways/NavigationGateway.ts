import { Navigation } from '@/core/domains/navigation/entities';

export enum NavigationName {
  MAIN_NAVIGATION = 'main_navigation',
}

export interface NavigationGateway {
  getNavigation(name: NavigationName): Promise<Navigation | undefined>;
}
