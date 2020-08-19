import { Record } from './record';
import { NavigationItem } from './navigation-item';
import { NavigationName } from './navigation-name';

export interface Navigation extends Record {
  id: string;
  title: string;
  name: NavigationName;
  items: NavigationItem[];
}
