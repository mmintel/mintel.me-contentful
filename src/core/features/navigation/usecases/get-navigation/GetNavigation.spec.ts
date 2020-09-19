import { Locale } from '@/core/domain';
import { Navigation, NavigationName } from '../../domain';
import { NavigationGateway } from '../../gateways';
import { GetNavigation } from './GetNavigation';

const mockNavigation = new Navigation({
  id: '123',
  title: 'foofoo',
  items: [],
  name: NavigationName.MAIN_NAVIGATION,
});

const mockGateway: jest.Mocked<NavigationGateway> = {
  getNavigation: jest.fn(),
};

describe('GetNavigation', () => {
  beforeEach(() => {
    mockGateway.getNavigation.mockResolvedValue(mockNavigation);
  });

  it('initializes without crashing', () => {
    expect(() => new GetNavigation(mockGateway)).not.toThrow();
  });

  describe('execute', () => {
    it('calls the gateway', async () => {
      expect(mockGateway.getNavigation).not.toHaveBeenCalled();

      const useCase = new GetNavigation(mockGateway);
      await useCase.execute({
        locale: Locale.DE,
        name: NavigationName.MAIN_NAVIGATION,
      });

      expect(mockGateway.getNavigation).toHaveBeenCalledTimes(1);
      expect(mockGateway.getNavigation).toHaveBeenCalledWith(
        Locale.DE,
        NavigationName.MAIN_NAVIGATION,
      );
    });

    it('returns a page if found', async () => {
      const useCase = new GetNavigation(mockGateway);
      const page = await useCase.execute({
        locale: Locale.DE,
        name: NavigationName.MAIN_NAVIGATION,
      });

      expect(page).toEqual(expect.objectContaining(mockNavigation));
    });

    it('returns an error if not found', async () => {
      mockGateway.getNavigation.mockRejectedValue('Not found');

      const useCase = new GetNavigation(mockGateway);
      await expect(
        useCase.execute({
          locale: Locale.DE,
          name: NavigationName.MAIN_NAVIGATION,
        }),
      ).rejects.toThrow();
    });
  });
});
