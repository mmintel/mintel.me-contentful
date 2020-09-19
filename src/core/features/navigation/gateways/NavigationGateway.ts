import { Locale } from '@/core/domain';
import {
  Navigation,
  NavigationName,
} from '@/core/features/navigation/domain';

export interface NavigationGateway {
  getNavigation(locale: Locale, name: NavigationName): Promise<Navigation>;
}
