import { ApiClient } from '@/lib/api';
import { PageService } from './page.service';

const mockApi: ApiClient = {
  getOne: jest.fn(),
  getMany: jest.fn(),
};

describe('PageService', () => {
  describe('getPage', () => {
    it('requests the page by slug', async () => {
      const pageService = new PageService(mockApi);
      expect(mockApi.getOne).not.toHaveBeenCalled();
      await pageService.getPage('foo/bar');
      expect(mockApi.getOne).toHaveBeenCalledWith(
        expect.objectContaining({
          fields: {
            slug: 'foo/bar',
          },
        }),
      );
    });

    it('strips all leading slashes', async () => {
      const pageService = new PageService(mockApi);
      await pageService.getPage('///foo/bar');
      expect(mockApi.getOne).toHaveBeenCalledWith(
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
      const pageService = new PageService(mockApi);
      expect(mockApi.getMany).not.toHaveBeenCalled();
      await pageService.getPages();
      expect(mockApi.getMany).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'page',
        }),
      );
    });
  });
});
