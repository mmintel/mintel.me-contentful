import { Page } from '@/core/features/page/domain';
import { GraphqlService } from '@/core/services';
import { ContentfulPageDTO } from './dtos/ContentfulPageDTO';
import { ContentfulPageGateway } from './ContentfulPageGateway';
import { AllPagesQuery } from './queries/AllPagesQuery';
import { createContentfulPage } from './fixtures';
import { ContentfulPageTeaserDTO } from './dtos/ContentfulPageTeaserDTO';

const mockGraphqlService: jest.Mocked<GraphqlService> = {
  request: jest.fn(),
};

const mockPage: ContentfulPageDTO = createContentfulPage();

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
      const mockResponse: ContentfulPageResponseDTO<ContentfulPageDTO> = {
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

  describe('getAllPageSlugs', () => {
    it('calls the graphqlService', () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();

      const gateway = new ContentfulPageGateway(mockGraphqlService);
      gateway.getAllPageSlugs('de-DE');

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(mockGraphqlService.request).toHaveBeenCalledWith(AllPagesQuery, {
        locale: 'de-DE',
      });
    });

    it('returns a list of slugs', async () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();

      const mockResponse: ContentfulPageResponseDTO<ContentfulPageTeaserDTO> = {
        pageCollection: {
          items: [
            {
              slug: 'foo',
            },
            {
              slug: 'bar',
            },
          ],
        },
      };
      mockGraphqlService.request.mockResolvedValue(mockResponse);

      const gateway = new ContentfulPageGateway(mockGraphqlService);
      const allPageSlugs = await gateway.getAllPageSlugs('de-DE');

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(allPageSlugs).toEqual(expect.arrayContaining(['foo', 'bar']));
    });

    it('returns empty array if no page found', async () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();

      const mockResponse: ContentfulPageResponseDTO<ContentfulPageTeaserDTO> = {
        pageCollection: {
          items: [],
        },
      };
      mockGraphqlService.request.mockResolvedValue(mockResponse);

      const gateway = new ContentfulPageGateway(mockGraphqlService);
      const allPageSlugs = await gateway.getAllPageSlugs('de-DE');

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(allPageSlugs).toEqual([]);
    });
  });
});
