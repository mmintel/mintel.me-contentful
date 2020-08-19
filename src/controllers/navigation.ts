import { Record, Navigation, NavigationName, Locale } from '@/value-objects';
import { ApiService } from '@/services';

export class NavigationController {
  constructor(private apiService: ApiService) {}

  public async getMainNavigation(locale: Locale): Promise<Navigation> {
    return this.apiService.getNavigation(NavigationName.mainNavigation, locale);
  }
}
