import { ContentfulLifeEventRepository } from "./repositories/contentful/ContentfulLifeEventRepository"
import { LifeEventRepository } from "./repositories/LiveEventRepository";
import { GraphqlService } from "./services";
import { GraphQLClient } from 'graphql-request';
import { contentfulAccessToken, contentfulSpaceId, contentfulURL } from '@/config';
import { SiteRepository } from "./repositories/SiteRepository";
import { ContentfulSiteRepository } from "./repositories/contentful/ContentfulSiteRepository";
import { LifeEvent, Site, Technology } from "./domain";
import { TechnologyRepository } from "./repositories/TechnologyRepository";
import { ContentfulTechnologyRepository } from "./repositories/contentful/ContentfulTechnologyRepository";

const graphqlService: GraphqlService = new GraphQLClient(`${contentfulURL}/${contentfulSpaceId}`, {
  headers: {
    Authorization: `Bearer ${contentfulAccessToken}`,
  }
});
const lifeEventRepository: LifeEventRepository = new ContentfulLifeEventRepository(graphqlService);
const siteRepository: SiteRepository = new ContentfulSiteRepository(graphqlService);
const technologyRepository: TechnologyRepository = new ContentfulTechnologyRepository(graphqlService);

export const getAllLifeEvents = (): Promise<LifeEvent[]> => lifeEventRepository.getAll();
export const getSite = (): Promise<Site> => siteRepository.get();
export const getAllHighlightedTechnologies = (): Promise<Technology[]> => technologyRepository.getAllHighlighted();
