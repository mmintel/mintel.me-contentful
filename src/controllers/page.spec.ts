import { ApiService } from '@/services';
import { PageController } from './page';
import { Locale } from '@/value-objects';

// TODO move to __mocks__
const mockApi: ApiService = {
  getNavigation: jest.fn(),
  getPage: jest.fn(),
  getAllPages: jest.fn(),
};

const mockLanguage = Locale.DE;

describe('PageController', () => {
  describe('getPage', () => {
    it('requests the page by slug', async () => {
      const pageService = new PageController(mockApi);
      expect(mockApi.getPage).not.toHaveBeenCalled();
      await pageService.getPage('foo/bar', mockLanguage);
      expect(mockApi.getPage).toHaveBeenCalledWith(
        expect.objectContaining({
          fields: {
            slug: 'foo/bar',
          },
        }),
      );
    });

    it('strips all leading slashes', async () => {
      const pageService = new PageController(mockApi);
      await pageService.getPage('///foo/bar', mockLanguage);
      expect(mockApi.getPage).toHaveBeenCalledWith(
        expect.objectContaining({
          fields: {
            slug: 'foo/bar',
          },
        }),
      );
    });
  });

  describe('getPages', () => {
    it('requests the page by slug', async () => {
      const pageService = new PageController(mockApi);
      expect(mockApi.getAllPages).not.toHaveBeenCalled();
      await pageService.getAllPages(mockLanguage);
      expect(mockApi.getAllPages).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'page',
        }),
      );
    });
  });
});
