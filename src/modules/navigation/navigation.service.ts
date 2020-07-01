import { TYPES } from './../types';
import { ApiClient, ContentType, Record } from '../api';
import { Navigation, NavigationName } from './navigation.interfaces';
import { inject, injectable } from 'inversify';

@injectable()
export class NavigationService {
  constructor(@inject(TYPES.ApiClient) private apiClient: ApiClient) {}

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
