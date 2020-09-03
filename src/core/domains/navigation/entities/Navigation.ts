import { NavigationItem } from './NavigationItem';

export interface Navigation {
  id: string;
  title: string;
  name: string;
  items: NavigationItem[];
}
