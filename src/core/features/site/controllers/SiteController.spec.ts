import { Site } from '../domain';
import { GetSiteUseCase } from '../usecases';
import { SiteController } from './SiteController';

const mockUseCase: jest.Mocked<GetSiteUseCase> = {
  execute: jest.fn(),
};

const mockSite = new Site({
  id: 'foo',
  logo: 'foo',
  title: 'foo',
  homepage: 'foo',
});

describe('SiteController', () => {
  it('should initialize without crashing', () => {
    expect(() => new SiteController(mockUseCase)).not.toThrow();
  });

  describe('getSite', () => {
    it('should execute the useCase', async () => {
      mockUseCase.execute.mockResolvedValue(mockSite);
      expect(mockUseCase.execute).not.toHaveBeenCalled();

      const controller = new SiteController(mockUseCase);
      await controller.getSite('de-DE');

      expect(mockUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});
