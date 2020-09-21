import { Page } from '../../domain';
import { PageGateway } from '../../gateways';
import { GetAllPages } from './GetAllPages';

const mockPage: Page = new Page({
  id: '123',
  description: 'foo',
  slug: 'foo-bar',
  title: 'foofoo',
  components: {
    json: {},
  },
});

const mockGateway: jest.Mocked<PageGateway> = {
  getPage: jest.fn(),
  getAllPages: jest.fn(),
};

describe('GetAllPages', () => {
  it('initializes without crashing', () => {
    expect(() => new GetAllPages(mockGateway)).not.toThrow();
  });

  describe('execute', () => {
    it('calls the gateway', async () => {
      mockGateway.getAllPages.mockResolvedValue([mockPage, mockPage]);
      expect(mockGateway.getAllPages).not.toHaveBeenCalled();

      const useCase = new GetAllPages(mockGateway);
      await useCase.execute({ locale: 'de-DE' });

      expect(mockGateway.getAllPages).toHaveBeenCalledTimes(1);
      expect(mockGateway.getAllPages).toHaveBeenCalledWith('de-DE');
    });

    it('returns all pages', async () => {
      mockGateway.getAllPages.mockResolvedValue([mockPage, mockPage]);
      const useCase = new GetAllPages(mockGateway);
      const allPages = await useCase.execute({
        locale: 'de-DE',
      });

      allPages.forEach((page) => {
        expect(page).toBeInstanceOf(Page);
      });
    });

    it('returns an empty array if nothing found', async () => {
      mockGateway.getAllPages.mockResolvedValue([]);

      const useCase = new GetAllPages(mockGateway);
      const allPages = await useCase.execute({
        locale: 'de-DE',
      });

      expect(allPages).toEqual([]);
    });
  });
});
