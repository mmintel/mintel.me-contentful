import { Locale } from '@/lib/core/domain';
import {
  Navigation,
  NavigationName,
} from '@/lib/core/features/navigation/domain';

export interface NavigationGateway {
  getNavigation(locale: Locale, name: NavigationName): Promise<Navigation>;
}
