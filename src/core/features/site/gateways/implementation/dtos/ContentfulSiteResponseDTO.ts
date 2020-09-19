import { ContentfulCollectionDTO } from '@/core/shared/dtos';
import { ContentfulSiteDTO } from './ContentfulSiteDTO';

export interface ContentfulSiteResponseDTO {
  siteCollection: ContentfulCollectionDTO<ContentfulSiteDTO>;
}
