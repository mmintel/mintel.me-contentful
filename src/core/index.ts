import { ContentfulLifeEventRepository } from "./repositories/contentful/ContentfulLifeEventRepository"
import { LifeEventRepository } from "./repositories/LiveEventRepository";
import { GraphqlService } from "./services";
import { GraphQLClient } from 'graphql-request';
import { contentfulAccessToken, contentfulSpaceId, contentfulURL } from '@/config';

const graphqlService: GraphqlService = new GraphQLClient(`${contentfulURL}/${contentfulSpaceId}`, {
  headers: {
    Authorization: `Bearer ${contentfulAccessToken}`,
  }
});
const lifeEventRepository: LifeEventRepository = new ContentfulLifeEventRepository(graphqlService);

export const getAllLifeEvents = lifeEventRepository.getAll;
