import { NavigationController } from './navigation';
import { PageController } from './page';
import { apiClient } from '@/implementations/services';

export const navigationController = new NavigationController(apiClient);
export const pageController = new PageController(apiClient);
