import { Locale } from '@/lib/core/domain';
import { NavigationName } from '@/lib/core/features/navigation/domain';
import { GraphqlService } from '@/lib/core/services';
import {
  ContentfulNavigationGateway,
  ContentfulNavigationResponse,
  ContentfulNavigation,
} from './ContentfulNavigationGateway';
import { NavigationQuery } from './queries/NavigationQuery';

const mockGraphqlService: jest.Mocked<GraphqlService> = {
  request: jest.fn(),
};

describe('ContentfulNavigationGateway', () => {
  it('initializes without crashing', () => {
    expect(
      () => new ContentfulNavigationGateway(mockGraphqlService, Locale.DE),
    ).not.toThrow();
  });

  describe('getNavigation', () => {
    it('calls the graphqlService', () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();

      const gateway = new ContentfulNavigationGateway(
        mockGraphqlService,
        Locale.DE,
      );
      gateway.getNavigation(NavigationName.MAIN_NAVIGATION);
      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(mockGraphqlService.request).toHaveBeenCalledWith(
        NavigationQuery,
        expect.objectContaining({
          locale: Locale.DE,
          name: NavigationName.MAIN_NAVIGATION,
        }),
      );
    });

    it('maps the data from contentful', async () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();

      const mockNavigation: ContentfulNavigation = {
        title: 'foo',
        name: 'foobar',
        itemsCollection: {
          items: [],
        },
        sys: {
          id: '124123213',
          firstPublishedAt: '213',
          publishedAt: '213123',
        },
      };
      const mockResponse: ContentfulNavigationResponse = {
        navigationCollection: {
          items: [mockNavigation],
        },
      };
      mockGraphqlService.request.mockResolvedValue(mockResponse);

      const gateway = new ContentfulNavigationGateway(
        mockGraphqlService,
        Locale.DE,
      );
      const navigation = await gateway.getNavigation(
        NavigationName.MAIN_NAVIGATION,
      );

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(navigation.id).toBe(mockNavigation.sys.id);
      expect(navigation.name).toBe(mockNavigation.name);
    });

    it('throws an error if no data', async () => {
      mockGraphqlService.request.mockResolvedValue(null);
      const gateway = new ContentfulNavigationGateway(
        mockGraphqlService,
        Locale.DE,
      );
      await expect(
        gateway.getNavigation(NavigationName.MAIN_NAVIGATION),
      ).rejects.toThrow();
    });
  });
});
