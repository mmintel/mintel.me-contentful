import { Collection } from "@/core/definitions";
import { LifeEvent } from "@/core/domain";
import { GraphqlService } from "../../services";
import { LifeEventRepository } from "../LiveEventRepository";
import { AllLifeEventsQuery } from "./queries/AllLifeEventsQuery";

export interface LifeEventResponse {
  lifeEventCollection: Collection<LifeEvent>;
}

export class ContentfulLifeEventRepository implements LifeEventRepository {
  constructor(private graphqlService: GraphqlService) {}

  async getAll(): Promise<LifeEvent[]> {
    const response = await this.graphqlService.request<LifeEventResponse>(AllLifeEventsQuery);
    return response.lifeEventCollection.items;
  }
}
