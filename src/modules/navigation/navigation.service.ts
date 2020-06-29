import { ApiClient, ContentType } from '../api';
import { Navigation, NavigationName } from './navigation.interfaces';

export class NavigationService {
  constructor(private apiClient: ApiClient) {}

  public async getMainNavigation(): Promise<Navigation> {
    const item = await this.apiClient.getOne<Navigation>({
      content_type: ContentType.navigation,
      'fields.name': NavigationName.mainNavigation,
    });
    return item;
  }
}
