import { Locale } from '@/lib/core/domain';
import { GraphqlService } from '@/lib/core/services';
import {
  ContentfulSiteGateway,
  ContentfulSiteResponse,
  ContentfulSite,
} from './ContentfulSiteGateway';
import { SiteQuery } from './queries/SiteQuery';

const mockGraphqlService: jest.Mocked<GraphqlService> = {
  request: jest.fn(),
};

describe('ContentfulSiteGateway', () => {
  it('initializes without crashing', () => {
    expect(
      () => new ContentfulSiteGateway(mockGraphqlService, Locale.DE),
    ).not.toThrow();
  });

  describe('getNavigation', () => {
    it('calls the graphqlService', () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();

      const gateway = new ContentfulSiteGateway(mockGraphqlService, Locale.DE);
      gateway.getSite();
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

      const mockSite: ContentfulSite = {
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
      const mockResponse: ContentfulSiteResponse = {
        siteCollection: {
          items: [mockSite],
        },
      };
      mockGraphqlService.request.mockResolvedValue(mockResponse);

      const gateway = new ContentfulSiteGateway(mockGraphqlService, Locale.DE);
      const site = await gateway.getSite();

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(site.id).toBe(mockSite.sys.id);
      expect(site.title).toBe(mockSite.title);
      expect(site.logo).toBe(mockSite.logo.url);
    });

    it('throws an error if no data', async () => {
      mockGraphqlService.request.mockResolvedValue(null);
      const gateway = new ContentfulSiteGateway(mockGraphqlService, Locale.DE);
      await expect(gateway.getSite()).rejects.toThrow();
    });
  });
});
