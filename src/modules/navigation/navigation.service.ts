import { ApiClient, ContentType, Record } from '../api';
import { Navigation, NavigationName } from './navigation.interfaces';

export class NavigationService {
  constructor(private apiClient: ApiClient) {}

  public async getMainNavigation(): Promise<Record<Navigation>> {
    const item = await this.apiClient.getOne<Navigation>({
      type: ContentType.navigation,
      fields: {
        name: NavigationName.mainNavigation,
      },
    });
    return item;
  }

  // private parse(item: Navigation) {

  // }
}
