import { Record, Navigation, NavigationName, Locale } from '@/models';
import { ApiClient } from '@/lib/api';
export class NavigationService {
  constructor(private apiClient: ApiClient) {}

  public async getMainNavigation(locale: Locale): Promise<Record<Navigation>> {
    return this.apiClient.getNavigation(NavigationName.mainNavigation, locale);
  }
}
