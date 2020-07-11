import { ApiClient } from '@/lib/api';
import { NavigationService } from './navigation.service';

const mockApi: ApiClient = {
  getOne: jest.fn(),
  getMany: jest.fn(),
};

describe('NavigationService', () => {
  it('requests the mainNavigation', async () => {
    const navigationService = new NavigationService(mockApi);
    await navigationService.getMainNavigation();
    expect(mockApi.getOne).toHaveBeenCalledTimes(1);
    expect(mockApi.getOne).toHaveBeenCalledWith(
      expect.objectContaining({
        fields: {
          name: 'main-navigation',
        },
      }),
    );
  });
});
