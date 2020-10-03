import { Page } from '../../domain';
import { PageFixture } from '../../fixtures';
import { PageRepository } from '../../repositories/PageRepository';
import { GetAllPages } from './GetAllPages';

const mockPage: Page = new PageFixture();

const mockRepository: jest.Mocked<PageRepository> = {
  find: jest.fn(),
  all: jest.fn(),
};

describe('GetAllPages', () => {
  it('initializes without crashing', () => {
    expect(() => new GetAllPages(mockRepository)).not.toThrow();
  });

  describe('execute', () => {
    it('calls the gateway', async () => {
      mockRepository.all.mockResolvedValue([mockPage, mockPage]);
      expect(mockRepository.all).not.toHaveBeenCalled();

      const useCase = new GetAllPages(mockRepository);
      await useCase.execute({ locale: 'de-DE' });

      expect(mockRepository.all).toHaveBeenCalledTimes(1);
      expect(mockRepository.all).toHaveBeenCalledWith('de-DE');
    });

    it('returns all pages', async () => {
      mockRepository.all.mockResolvedValue([mockPage, mockPage]);
      const useCase = new GetAllPages(mockRepository);
      const allPages = await useCase.execute({
        locale: 'de-DE',
      });

      allPages.forEach((page) => {
        expect(page).toBeInstanceOf(Page);
      });
    });

    it('returns an empty array if nothing found', async () => {
      mockRepository.all.mockResolvedValue([]);

      const useCase = new GetAllPages(mockRepository);
      const allPages = await useCase.execute({
        locale: 'de-DE',
      });

      expect(allPages).toEqual([]);
    });
  });
});
