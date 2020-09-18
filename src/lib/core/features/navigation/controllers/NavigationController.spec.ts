import { Locale } from '@/lib/core/domain';
import { Navigation, NavigationName } from '../domain';
import { GetNavigationUseCase } from '../usecases';
import { NavigationController } from './NavigationController';

const mockUseCase: jest.Mocked<GetNavigationUseCase> = {
  execute: jest.fn(),
};

const mockNavigation = new Navigation({
  id: 'foo',
  items: [],
  name: 'foo',
  title: 'foobar',
});

describe('NavigationController', () => {
  it('should initialize without crashing', () => {
    expect(() => new NavigationController(mockUseCase)).not.toThrow();
  });

  describe('getMainNavigation', () => {
    it('should execute the useCase', async () => {
      mockUseCase.execute.mockResolvedValue(mockNavigation);
      expect(mockUseCase.execute).not.toHaveBeenCalled();

      const controller = new NavigationController(mockUseCase);
      await controller.getMainNavigation('de-DE');

      expect(mockUseCase.execute).toHaveBeenCalledTimes(1);
      expect(mockUseCase.execute).toHaveBeenCalledWith({
        locale: Locale.DE,
        name: NavigationName.MAIN_NAVIGATION,
      });
    });

    it('transforms domain model to DTO', async () => {
      mockUseCase.execute.mockResolvedValue(mockNavigation);

      const controller = new NavigationController(mockUseCase);
      const navigation = await controller.getMainNavigation('de-DE');

      expect(navigation).not.toBeInstanceOf(Navigation);
      expect(navigation.id).toEqual(mockNavigation.id);
    });
  });
});
