import { PageDTO } from '../../page/dtos';

export interface NavigationItemDTO {
  id: string;
  title: string;
  internal: boolean;
  url: string | null;
  page: PageDTO | null;
}
