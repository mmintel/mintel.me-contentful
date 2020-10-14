import { createTechnology } from '@/core/fixtures/createTechnology';
import { GraphqlService } from '@/core/services';
import {
  ContentfulTechnologyRepository,
  TechnologyResponse,
} from './ContentfulTechnologyRepository';
import { AllHighlightedTechnologiesQuery } from './queries/AllHighlightedTechnologiesQuery';

const mockGraphqlService: jest.Mocked<GraphqlService> = {
  request: jest.fn(),
};

const mockResponse: TechnologyResponse = {
  technologyCollection: {
    items: [createTechnology(), createTechnology()],
  },
};

describe('ContentfulTechnologyRepository', () => {
  it('initializes without crashing', () => {
    expect(
      () => new ContentfulTechnologyRepository(mockGraphqlService),
    ).not.toThrow();
  });

  describe('getAllHighlighted', () => {
    it('calls the graphqlService exactly once', async () => {
      mockGraphqlService.request.mockResolvedValueOnce(mockResponse);
      expect(mockGraphqlService.request).toHaveBeenCalledTimes(0);
      const repo = new ContentfulTechnologyRepository(mockGraphqlService);
      await repo.getAllHighlighted();
      expect(mockGraphqlService.request).toHaveBeenCalledTimes(1);
    });

    it('calls the graphqlService with the right data', async () => {
      mockGraphqlService.request.mockResolvedValueOnce(mockResponse);
      const repo = new ContentfulTechnologyRepository(mockGraphqlService);
      await repo.getAllHighlighted();
      expect(mockGraphqlService.request).toHaveBeenCalledWith(
        AllHighlightedTechnologiesQuery,
      );
    });

    it('returns multiple technologies', async () => {
      mockGraphqlService.request.mockResolvedValueOnce(mockResponse);
      const repo = new ContentfulTechnologyRepository(mockGraphqlService);
      const result = await repo.getAllHighlighted();
      expect(result.length).toEqual(
        mockResponse.technologyCollection.items.length,
      );
    });
  });
});
