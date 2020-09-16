import { Locale } from '@/lib/core/domain';
import { GraphqlService } from '@/lib/core/services';
import {
  ContentfulPageGateway,
  ContentfulPage,
  ContentfulPageResponse,
} from './ContentfulPageGateway';
import { PageQuery } from './queries/PageQuery';

const mockGraphqlService: jest.Mocked<GraphqlService> = {
  request: jest.fn(),
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

    it('maps the data from contentful', async () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();

      const mockPage: ContentfulPage = {
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
      const mockResponse: ContentfulPageResponse = {
        pageCollection: {
          items: [mockPage],
        },
      };
      mockGraphqlService.request.mockResolvedValue(mockResponse);

      const gateway = new ContentfulPageGateway(mockGraphqlService, Locale.DE);
      const navigation = await gateway.getPage('foo');

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(navigation.id).toBe(mockPage.sys.id);
      expect(navigation.title).toBe(mockPage.title);
      expect(navigation.description).toBe(mockPage.description);
      expect(navigation.slug).toBe(mockPage.slug);
    });

    it('throws an error if no data', async () => {
      mockGraphqlService.request.mockResolvedValue(null);
      const gateway = new ContentfulPageGateway(mockGraphqlService, Locale.DE);
      await expect(gateway.getPage('foo')).rejects.toThrow();
    });
  });
});
