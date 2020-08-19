import { ApiService } from '@/services';
import { Locale } from '@/value-objects';
import { NavigationController } from './navigation';

// TODO move to __mocks__
const mockApi: ApiService = {
  getNavigation: jest.fn(),
  getPage: jest.fn(),
  getAllPages: jest.fn(),
};

describe('NavigationController', () => {
  it('requests the mainNavigation', async () => {
    const navigationService = new NavigationController(mockApi);
    await navigationService.getMainNavigation(Locale.DE);
    expect(mockApi.getNavigation).toHaveBeenCalledTimes(1);
    expect(mockApi.getNavigation).toHaveBeenCalledWith(
      'main-navigation',
      Locale.DE,
    );
  });
});
