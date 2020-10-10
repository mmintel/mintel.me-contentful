import { createLifeEvent } from "@/core/fixtures/createLifeEvent"
import { GraphqlService } from "@/core/services"
import { ContentfulLifeEventRepository, LifeEventResponse } from "./ContentfulLifeEventRepository"
import { AllLifeEventsQuery } from "./queries/AllLifeEventsQuery"

const mockGraphqlService: jest.Mocked<GraphqlService> = {
  request: jest.fn(),
}

const mockResponse: LifeEventResponse = {
  lifeEventCollection: {
    items: [
      createLifeEvent(),
      createLifeEvent(),
    ]
  }
}

describe('ContentfulLiveEventRepository', () => {
  it('initializes without crashing', () => {
    expect(() => new ContentfulLifeEventRepository(mockGraphqlService)).not.toThrow();
  })

  describe('getAll', () => {
    it('calls the graphqlService exactly once', async () => {
      mockGraphqlService.request.mockResolvedValueOnce(mockResponse);
      expect(mockGraphqlService.request).toHaveBeenCalledTimes(0);
      const repo = new ContentfulLifeEventRepository(mockGraphqlService);
      await repo.getAll();
      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
    });

    it('calls the graphqlService with the right data', async () => {
      mockGraphqlService.request.mockResolvedValueOnce(mockResponse);
      const repo = new ContentfulLifeEventRepository(mockGraphqlService);
      await repo.getAll();
      expect(mockGraphqlService.request).toHaveBeenCalledWith(AllLifeEventsQuery);
    });
  })
})
