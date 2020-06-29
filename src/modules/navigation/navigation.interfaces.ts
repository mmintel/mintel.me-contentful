export enum NavigationName {
  mainNavigation = 'main-navigation',
}

export interface Navigation {
  title: string;
  items: NavigationItem;
  name: NavigationName;
}

export interface NavigationItem {
  title: string;
}
