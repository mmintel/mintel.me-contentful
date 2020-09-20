import { NavigationName } from '../../domain';

export interface GetNavigationRequestDTO {
  locale: string;
  name: NavigationName;
}
