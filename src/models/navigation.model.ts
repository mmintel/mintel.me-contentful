export enum NavigationName {
  mainNavigation = 'main-navigation',
}

export interface Navigation {
  id: string;
  title: string;
  name: NavigationName;
  items: NavigationItem[];
}

export interface NavigationItem {
  id: string;
  title: string;
  internal: boolean;
  url?: string;
  page?: {
    slug: string;
  };
}
