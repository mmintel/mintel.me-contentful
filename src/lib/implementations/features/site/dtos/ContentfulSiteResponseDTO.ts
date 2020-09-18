import { ContentfulCollectionDTO } from '@/lib/implementations/dtos';
import { ContentfulSiteDTO } from './ContentfulSiteDTO';

export interface ContentfulSiteResponseDTO {
  siteCollection: ContentfulCollectionDTO<ContentfulSiteDTO>;
}
