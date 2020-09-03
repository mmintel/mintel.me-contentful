import {
  NavigationGateway,
  NavigationName,
} from '@/core/domains/navigation/gateways';
import { Navigation } from '@/core/domains/navigation/entities';

export class ContentfulNavigationGateway implements NavigationGateway {
  async getNavigation(name: NavigationName): Promise<Navigation | undefined> {
    return;
  }
}
