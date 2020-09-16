import { NavigationName } from '../domain';
import { GetNavigationUseCase } from '../usecases';
import { NavigationController } from './NavigationController';

const mockUseCase: jest.Mocked<GetNavigationUseCase> = {
  execute: jest.fn(),
};

describe('NavigationController', () => {
  it('should initialize without crashing', () => {
    expect(() => new NavigationController(mockUseCase)).not.toThrow();
  });

  describe('getMainNavigation', () => {
    it('should execute the useCase', async () => {
      expect(mockUseCase.execute).not.toHaveBeenCalled();

      const controller = new NavigationController(mockUseCase);
      await controller.getMainNavigation();

      expect(mockUseCase.execute).toHaveBeenCalledTimes(1);
      expect(mockUseCase.execute).toHaveBeenCalledWith({
        name: NavigationName.MAIN_NAVIGATION,
      });
    });
  });
});
