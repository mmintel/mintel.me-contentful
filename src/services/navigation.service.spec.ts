import { ApiClient } from '@/lib/api';
import { NavigationService } from './navigation.service';
import { Locale } from '@/models';

// TODO move to __mocks__
const mockApi: ApiClient = {
  getNavigation: jest.fn(),
  getPage: jest.fn(),
};

describe('NavigationService', () => {
  it('requests the mainNavigation', async () => {
    const navigationService = new NavigationService(mockApi);
    await navigationService.getMainNavigation(Locale.DE);
    expect(mockApi.getNavigation).toHaveBeenCalledTimes(1);
    expect(mockApi.getNavigation).toHaveBeenCalledWith(
      'main-navigation',
      Locale.DE,
    );
  });
});
