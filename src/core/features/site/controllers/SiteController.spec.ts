import { GetSiteUseCase } from '../usecases';
import { SiteController } from './SiteController';

const mockUseCase: jest.Mocked<GetSiteUseCase> = {
  execute: jest.fn(),
};

describe('SiteController', () => {
  it('should initialize without crashing', () => {
    expect(() => new SiteController(mockUseCase)).not.toThrow();
  });

  describe('getSite', () => {
    it('should execute the useCase', async () => {
      expect(mockUseCase.execute).not.toHaveBeenCalled();

      const controller = new SiteController(mockUseCase);
      await controller.getSite();

      expect(mockUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});
