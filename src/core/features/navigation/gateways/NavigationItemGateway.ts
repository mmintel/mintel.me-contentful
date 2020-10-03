import { NavigationItem } from '@/core/features/navigation/domain';

export interface NavigationItemGateway {
  getNavigationItem(locale: string, id: string): Promise<NavigationItem>;
}
