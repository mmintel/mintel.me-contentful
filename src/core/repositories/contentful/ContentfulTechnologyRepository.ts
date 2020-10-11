import { Collection } from "@/core/definitions";
import { Technology } from "@/core/domain";
import { GraphqlService } from "../../services";
import { TechnologyRepository } from "../TechnologyRepository";
import { AllHighlightedTechnologiesQuery } from './queries/AllHighlightedTechnologiesQuery';

export interface TechnologyResponse {
  technologyCollection: Collection<Technology>;
}

export class ContentfulTechnologyRepository implements TechnologyRepository {
  constructor(private graphqlService: GraphqlService) {}

  async getAllHighlighted(): Promise<Technology[]> {
    const response = await this.graphqlService.request<TechnologyResponse>(AllHighlightedTechnologiesQuery);
    return response.technologyCollection.items;
  }
}
