import { Locale } from '@/lib/core/domain';
import { Page } from '@/lib/core/features/page/domain';
import { GraphqlService } from '@/lib/core/services';
import { ContentfulPageDTO } from '../dtos/ContentfulPageDTO';
import { ContentfulPageResponseDTO } from '../dtos/ContentfulPageResponseDTO';
import { ContentfulPageGateway } from './ContentfulPageGateway';
import { AllPagesQuery } from './queries/AllPagesQuery';
import { PageQuery } from './queries/PageQuery';

const mockGraphqlService: jest.Mocked<GraphqlService> = {
  request: jest.fn(),
};

const mockPage: ContentfulPageDTO = {
  title: 'foo',
  description: 'foobar',
  slug: 'foo-bar',
  components: {
    json: {},
  },
  sys: {
    id: '124123213',
    firstPublishedAt: '213',
    publishedAt: '213123',
  },
};

describe('ContentfulPageGateway', () => {
  it('initializes without crashing', () => {
    expect(
      () => new ContentfulPageGateway(mockGraphqlService, Locale.DE),
    ).not.toThrow();
  });

  describe('getPage', () => {
    it('calls the graphqlService', () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();

      const gateway = new ContentfulPageGateway(mockGraphqlService, Locale.DE);
      gateway.getPage('foo');

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(mockGraphqlService.request).toHaveBeenCalledWith(
        PageQuery,
        expect.objectContaining({
          locale: Locale.DE,
          slug: 'foo',
        }),
      );
    });

    it('returns a page', async () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();
      const mockResponse: ContentfulPageResponseDTO = {
        pageCollection: {
          items: [mockPage],
        },
      };
      mockGraphqlService.request.mockResolvedValue(mockResponse);

      const gateway = new ContentfulPageGateway(mockGraphqlService, Locale.DE);
      const page = await gateway.getPage('foo');

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(page).toBeInstanceOf(Page);
    });

    it('throws an error if no data', async () => {
      mockGraphqlService.request.mockResolvedValue(null);
      const gateway = new ContentfulPageGateway(mockGraphqlService, Locale.DE);
      await expect(gateway.getPage('foo')).rejects.toThrow();
    });
  });

  describe('getAllPages', () => {
    it('calls the graphqlService', () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();

      const gateway = new ContentfulPageGateway(mockGraphqlService, Locale.DE);
      gateway.getAllPages();

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(mockGraphqlService.request).toHaveBeenCalledWith(
        AllPagesQuery,
        expect.objectContaining({
          locale: Locale.DE,
        }),
      );
    });

    it('returns a list of pages', async () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();

      const mockResponse: ContentfulPageResponseDTO = {
        pageCollection: {
          items: [mockPage, mockPage],
        },
      };
      mockGraphqlService.request.mockResolvedValue(mockResponse);

      const gateway = new ContentfulPageGateway(mockGraphqlService, Locale.DE);
      const allPages = await gateway.getAllPages();

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);

      allPages.forEach(page => {
        expect(page).toBeInstanceOf(Page);
      });
    });

    it('returns empty array if no page found', async () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();

      const mockResponse: ContentfulPageResponseDTO = {
        pageCollection: {
          items: [],
        },
      };
      mockGraphqlService.request.mockResolvedValue(mockResponse);

      const gateway = new ContentfulPageGateway(mockGraphqlService, Locale.DE);
      const allPages = await gateway.getAllPages();

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(allPages).toEqual([]);
    });
  });
});
