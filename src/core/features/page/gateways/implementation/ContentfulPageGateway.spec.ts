import { Page } from '@/core/features/page/domain';
import { GraphqlService } from '@/core/services';
import { ContentfulPageDTO } from './dtos/ContentfulPageDTO';
import { ContentfulPageResponseDTO } from './dtos/ContentfulPageResponseDTO';
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
    expect(() => new ContentfulPageGateway(mockGraphqlService)).not.toThrow();
  });

  describe('getPage', () => {
    it('calls the graphqlService', () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();

      const gateway = new ContentfulPageGateway(mockGraphqlService);
      gateway.getPage('de-DE', 'foo');

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(mockGraphqlService.request).toHaveBeenCalledWith(
        PageQuery,
        expect.objectContaining({
          locale: 'de-DE',
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

      const gateway = new ContentfulPageGateway(mockGraphqlService);
      const page = await gateway.getPage('de-DE', 'foo');

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(page).toBeInstanceOf(Page);
    });

    it('throws an error if no data', async () => {
      mockGraphqlService.request.mockResolvedValue(null);
      const gateway = new ContentfulPageGateway(mockGraphqlService);
      await expect(gateway.getPage('de-DE', 'foo')).rejects.toThrow();
    });
  });

  describe('getAllPages', () => {
    it('calls the graphqlService', () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();

      const gateway = new ContentfulPageGateway(mockGraphqlService);
      gateway.getAllPages('de-DE');

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(mockGraphqlService.request).toHaveBeenCalledWith(AllPagesQuery, {
        locale: 'de-DE',
      });
    });

    it('returns a list of pages', async () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();

      const mockResponse: ContentfulPageResponseDTO = {
        pageCollection: {
          items: [mockPage, mockPage],
        },
      };
      mockGraphqlService.request.mockResolvedValue(mockResponse);

      const gateway = new ContentfulPageGateway(mockGraphqlService);
      const allPages = await gateway.getAllPages('de-DE');

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);

      allPages.forEach((page) => {
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

      const gateway = new ContentfulPageGateway(mockGraphqlService);
      const allPages = await gateway.getAllPages('de-DE');

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(allPages).toEqual([]);
    });
  });
});
