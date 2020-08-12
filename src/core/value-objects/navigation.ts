import { NavigationItem } from './navigation-item';
import { NavigationName } from './navigation-name';

export interface Navigation {
  id: string;
  title: string;
  name: NavigationName;
  items: NavigationItem[];
}
