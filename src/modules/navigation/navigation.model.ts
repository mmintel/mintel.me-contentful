import { Record } from '../record';

export enum NavigationName {
  mainNavigation = 'main-navigation',
}

export interface Navigation {
  title: string;
  name: NavigationName;
  items: Record<NavigationItem>[];
}

export interface NavigationItem {
  title: string;
  internal: boolean;
}
