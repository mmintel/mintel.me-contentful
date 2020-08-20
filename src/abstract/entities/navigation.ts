import { Record } from './record';
import { NavigationItem } from '../types/navigation-item';
import { NavigationName } from '../types/navigation-name';

export interface Navigation extends Record {
  id: string;
  title: string;
  name: NavigationName;
  items: NavigationItem[];
}
