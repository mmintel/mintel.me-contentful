import { NavigationItemDTO } from './NavigationItemDTO';

export interface NavigationDTO {
  id: string;
  title: string;
  name: string;
  items: NavigationItemDTO[];
}
