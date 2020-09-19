import { Locale } from '@/core/domain';
import { NavigationName } from '@/core/features/navigation/domain';
import { GraphqlService } from '@/core/services';
import {
  ContentfulNavigationDTO,
  ContentfulNavigationResponseDTO,
} from './dtos';
import { ContentfulNavigationGateway } from './ContentfulNavigationGateway';
import { NavigationQuery } from './queries/NavigationQuery';

const mockGraphqlService: jest.Mocked<GraphqlService> = {
  request: jest.fn(),
};

describe('ContentfulNavigationGateway', () => {
  it('initializes without crashing', () => {
    expect(
      () => new ContentfulNavigationGateway(mockGraphqlService),
    ).not.toThrow();
  });

  describe('getNavigation', () => {
    it('calls the graphqlService', () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();

      const gateway = new ContentfulNavigationGateway(mockGraphqlService);
      gateway.getNavigation(Locale.DE, NavigationName.MAIN_NAVIGATION);
      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(mockGraphqlService.request).toHaveBeenCalledWith(
        NavigationQuery,
        expect.objectContaining({
          name: NavigationName.MAIN_NAVIGATION,
        }),
      );
    });

    it('maps the data from contentful', async () => {
      expect(mockGraphqlService.request).not.toHaveBeenCalled();

      const mockNavigation: ContentfulNavigationDTO = {
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
      const mockResponse: ContentfulNavigationResponseDTO = {
        navigationCollection: {
          items: [mockNavigation],
        },
      };
      mockGraphqlService.request.mockResolvedValue(mockResponse);

      const gateway = new ContentfulNavigationGateway(mockGraphqlService);
      const navigation = await gateway.getNavigation(
        Locale.DE,
        NavigationName.MAIN_NAVIGATION,
      );

      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
      expect(navigation.id).toBe(mockNavigation.sys.id);
      expect(navigation.name).toBe(mockNavigation.name);
    });

    it('throws an error if no data', async () => {
      mockGraphqlService.request.mockResolvedValue(null);
      const gateway = new ContentfulNavigationGateway(mockGraphqlService);
      await expect(
        gateway.getNavigation(Locale.DE, NavigationName.MAIN_NAVIGATION),
      ).rejects.toThrow();
    });
  });
});