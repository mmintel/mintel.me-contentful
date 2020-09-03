import { NavigationItemResponseDTO } from './GetNavigationItemResponseDTO';

export interface GetNavigationResponseDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  name: string;
  items: NavigationItemResponseDTO[];
}
