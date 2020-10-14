import { createSite } from "@/core/fixtures/createSite"
import { GraphqlService } from "@/core/services"
import { ContentfulSiteRepository, SiteResponse } from "./ContentfulSiteRepository"
import { SiteQuery } from "./queries/SiteQuery"

const mockGraphqlService: jest.Mocked<GraphqlService> = {
  request: jest.fn(),
}

const mockResponse: SiteResponse = {
  siteCollection: {
    items: [
      createSite(),
      createSite(),
    ]
  }
}

describe('ContentfulSiteRepository', () => {
  it('initializes without crashing', () => {
    expect(() => new ContentfulSiteRepository(mockGraphqlService)).not.toThrow();
  })

  describe('get', () => {
    it('calls the graphqlService exactly once', async () => {
      mockGraphqlService.request.mockResolvedValueOnce(mockResponse);
      expect(mockGraphqlService.request).toHaveBeenCalledTimes(0);
      const repo = new ContentfulSiteRepository(mockGraphqlService);
      await repo.get();
      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
    });

    it('calls the graphqlService with the right data', async () => {
      mockGraphqlService.request.mockResolvedValueOnce(mockResponse);
      const repo = new ContentfulSiteRepository(mockGraphqlService);
      await repo.get();
      expect(mockGraphqlService.request).toHaveBeenCalledWith(SiteQuery);
    });
  })
})
