import { NavigationName } from '../../domain';

export interface GetNavigationRequest {
  locale: string;
  name: NavigationName;
}
