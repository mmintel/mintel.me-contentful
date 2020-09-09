import { NavigationGateway } from '@/core/gateways';
import { Navigation, NavigationName } from '@/core/domain';

export class ContentfulNavigationGateway implements NavigationGateway {
  async getNavigation(name: NavigationName): Promise<Navigation | undefined> {
    return;
  }
}
