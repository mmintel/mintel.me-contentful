import { Locale } from '@/lib/core/domain';
import { NavigationName } from '../../domain';

export interface GetNavigationRequestDTO {
  locale: Locale;
  name: NavigationName;
}
