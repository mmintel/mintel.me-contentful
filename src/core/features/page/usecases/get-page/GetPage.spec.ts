import { Page } from '../../domain';
import { PageRepository } from '../../repositories/PageRepository';
import { GetPage } from './GetPage';

const mockPage: Page = new Page({
  id: '123',
  description: 'foo',
  slug: 'foo-bar',
  title: 'foofoo',
  components: [],
});

const mockRepository: jest.Mocked<PageRepository> = {
  findBySlug: jest.fn(),
  findById: jest.fn(),
  all: jest.fn(),
};

describe('GetPage', () => {
  beforeEach(() => {
    mockRepository.findBySlug.mockResolvedValue(mockPage);
  });

  it('initializes without crashing', () => {
    expect(() => new GetPage(mockRepository)).not.toThrow();
  });

  describe('execute', () => {
    it('calls the gateway', async () => {
      expect(mockRepository.findBySlug).not.toHaveBeenCalled();

      const useCase = new GetPage(mockRepository);
      await useCase.execute({ locale: 'de-DE', slug: mockPage.slug });

      expect(mockRepository.findBySlug).toHaveBeenCalledTimes(1);
      expect(mockRepository.findBySlug).toHaveBeenCalledWith(
        'de-DE',
        mockPage.slug,
      );
    });

    it('returns a page if found', async () => {
      const useCase = new GetPage(mockRepository);
      const page = await useCase.execute({
        locale: 'de-DE',
        slug: mockPage.slug,
      });

      expect(page).toBeInstanceOf(Page);
    });

    it('returns an error if not found', async () => {
      mockRepository.findBySlug.mockRejectedValue('Not found');

      const useCase = new GetPage(mockRepository);
      await expect(
        useCase.execute({ locale: 'de-DE', slug: mockPage.slug }),
      ).rejects.toThrow();
    });
  });
});
