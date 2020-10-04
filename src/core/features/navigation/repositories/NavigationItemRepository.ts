import { PageRepository } from '../../page/repositories/PageRepository';
import { NavigationItem } from '../domain';
import { NavigationItemGateway } from '../gateways';

export interface NavigationItemRepository {
  find(locale: string, id: string): Promise<NavigationItem>;
}

export class NavigationItemRepositoryImpl implements NavigationItemRepository {
  private navigationItems: NavigationItem[] = [];

  constructor(
    private gateway: NavigationItemGateway,
    private pageRepository: PageRepository,
  ) {}

  async find(locale: string, id: string): Promise<NavigationItem> {
    const navigationItemFromCache = this.navigationItems.find(
      (i) => i.id === id,
    );

    if (navigationItemFromCache) return navigationItemFromCache;

    const navigationItem = await this.gateway.getNavigationItem(locale, id);

    if (!navigationItem) {
      throw new Error(`Could not find NavigationItem with id "${id}".`);
    }

    if (navigationItem.pageID) {
      const page = await this.pageRepository.findById(
        locale,
        navigationItem.pageID,
      );

      navigationItem.setPage(page);
    }

    this.navigationItems.push(navigationItem);

    return navigationItem;
  }
}
