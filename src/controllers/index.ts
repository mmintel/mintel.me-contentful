import { NavigationController } from './navigation';
import { PageController } from './page';
import { apiClient } from '@/adapters';

export const navigationController = new NavigationController(apiClient);
export const pageController = new PageController(apiClient);
