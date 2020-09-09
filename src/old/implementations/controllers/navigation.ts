import { Record, NavigationName, Locale } from '@/old/abstract/types';
import { ApiService } from '@/old/abstract/services';
import { Navigation } from '@/old/implementations/entities/navigation';

export class NavigationController {
  constructor(private apiService: ApiService) {}

  public async getMainNavigation(locale: Locale): Promise<Navigation> {
    const data = await this.apiService.getNavigation(
      NavigationName.mainNavigation,
      locale,
    );
    const navigation = new Navigation(data);
    return navigation;
  }
}
