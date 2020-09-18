import { Locale } from '@/lib/core/domain';
import { GraphqlService } from '@/lib/core/services';
import { ContentfulSiteDTO, ContentfulSiteResponseDTO } from '../dtos';
import { ContentfulSiteGateway } from './ContentfulSiteGateway';
import { SiteQuery } from './queries/SiteQuery';

const mockGraphqlService: jest.Mocked<GraphqlService> = {
  request: jest.fn(),
};

const mockSite: ContentfulSiteDTO = {
  title: 'foo',
  logo: {
    title: 'avatar',
    description: 'foobar',
    contentType: 'image/jpeg',
    fileName: 'avatar.jpg',
    size: 59845,
    url: 'https://foobarbaz.com/avatar.jpg',
    width: 512,
    height: 512,
  },
  sys: {
    id: '124123213',
    firstPublishedAt: '213',
    publishedAt: '213123',
  },
};

const mockResponse: ContentfulSiteResponseDTO = {
  siteCollection: {
    items: [mockSite],
  },
};

describe('ContentfulSiteGateway', () => {
  it('initializes without crashing', () => {
    expect(() => new ContentfulSiteGateway(mockGraphqlService)).not.toThrow();
  });

  describe('getSite', () => {
    it('calls the graphqlService', async () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();
      mockGraphqlService.request.mockResolvedValue(mockResponse);

      const gateway = new ContentfulSiteGateway(mockGraphqlService);

      await gateway.getSite(Locale.DE);

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(mockGraphqlService.request).toHaveBeenCalledWith(
        SiteQuery,
        expect.objectContaining({
          locale: Locale.DE,
        }),
      );
    });

    it('maps the data from contentful', async () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();
      mockGraphqlService.request.mockResolvedValue(mockResponse);

      const gateway = new ContentfulSiteGateway(mockGraphqlService);
      const site = await gateway.getSite(Locale.DE);

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(site.id).toBe(mockSite.sys.id);
      expect(site.title).toBe(mockSite.title);
      expect(site.logo).toBe(mockSite.logo.url);
    });

    it('throws an error if no data', async () => {
      mockGraphqlService.request.mockResolvedValue(null);
      const gateway = new ContentfulSiteGateway(mockGraphqlService);
      await expect(gateway.getSite(Locale.DE)).rejects.toThrow();
    });
  });
});
