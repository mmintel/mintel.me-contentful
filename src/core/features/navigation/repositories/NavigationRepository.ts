import { Navigation, NavigationName } from '../domain';
import { NavigationGateway } from '../gateways';
import { NavigationItemRepository } from './NavigationItemRepository';

export interface NavigationRepository {
  find(locale: string, slug: NavigationName): Promise<Navigation>;
}

export class NavigationRepositoryImpl implements NavigationRepository {
  private navigations: Navigation[] = [];

  constructor(
    private gateway: NavigationGateway,
    private navigationItemRepository: NavigationItemRepository,
  ) {}

  /**
   * finds a navigation by looking first in the navigation cache, if there is
   * nothing found it will fetch via gateway.
   */
  async find(locale: string, name: NavigationName): Promise<Navigation> {
    const navigationFromCache = this.navigations.find((n) => n.name === name);

    if (navigationFromCache) return navigationFromCache;

    const navigation = await this.gateway.getNavigation(locale, name);

    if (!navigation) {
      throw new Error('Could not find navigation.');
    }

    await Promise.all(
      navigation.itemIDs.map(async (id) => {
        console.log('LOOKING UP ID', id);

        const navigationItem = await this.navigationItemRepository.find(
          locale,
          id,
        );
        console.log('RECEIVED NAV ITEM', navigationItem);

        navigation.addItem(navigationItem);
      }),
    );

    this.navigations.push(navigation);

    return navigation;
  }
}
