import { Collection } from "@/core/definitions";
import { Site } from "@/core/domain";
import { GraphqlService } from "../../services";
import { SiteRepository } from "../SiteRepository";
import { SiteQuery } from './queries/SiteQuery';

interface SiteResponse {
  siteCollection: Collection<Site>;
}

export class ContentfulSiteRepository implements SiteRepository {
  constructor(private graphqlService: GraphqlService) {}

  async get(): Promise<Site> {
    const response = await this.graphqlService.request<SiteResponse>(SiteQuery);
    return response.siteCollection.items[0];
  }
}
