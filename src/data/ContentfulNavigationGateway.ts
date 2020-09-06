import { NavigationGateway, NavigationName } from '@/core/gateways';
import { Navigation } from '@/core/domain';

export class ContentfulNavigationGateway implements NavigationGateway {
  async getNavigation(name: NavigationName): Promise<Navigation | undefined> {
    return;
  }
}
