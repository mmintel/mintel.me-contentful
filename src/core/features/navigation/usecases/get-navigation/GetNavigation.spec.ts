import { Navigation, NavigationName } from '../../domain';
import { NavigationFixture } from '../../fixtures';
import { NavigationRepository } from '../../repositories/NavigationRepository';
import { GetNavigation } from './GetNavigation';

const mockNavigation: Navigation = new NavigationFixture({
  name: NavigationName.MAIN_NAVIGATION,
});

const mockRepository: jest.Mocked<NavigationRepository> = {
  find: jest.fn(),
};

describe('GetNavigation', () => {
  beforeEach(() => {
    mockRepository.find.mockResolvedValue(mockNavigation);
  });

  it('initializes without crashing', () => {
    expect(() => new GetNavigation(mockRepository)).not.toThrow();
  });

  describe('execute', () => {
    it('calls the gateway', async () => {
      expect(mockRepository.find).not.toHaveBeenCalled();

      const useCase = new GetNavigation(mockRepository);
      await useCase.execute({
        locale: 'de-DE',
        name: NavigationName.MAIN_NAVIGATION,
      });

      expect(mockRepository.find).toHaveBeenCalledTimes(1);
      expect(mockRepository.find).toHaveBeenCalledWith(
        'de-DE',
        NavigationName.MAIN_NAVIGATION,
      );
    });

    it('returns a navigation if found', async () => {
      const useCase = new GetNavigation(mockRepository);
      const navigation = await useCase.execute({
        locale: 'de-DE',
        name: NavigationName.MAIN_NAVIGATION,
      });

      expect(navigation).toBeInstanceOf(Navigation);
    });

    it('returns an error if not found', async () => {
      mockRepository.find.mockRejectedValue('Not found');

      const useCase = new GetNavigation(mockRepository);
      await expect(
        useCase.execute({
          locale: 'de-DE',
          name: NavigationName.MAIN_NAVIGATION,
        }),
      ).rejects.toThrow();
    });
  });
});
