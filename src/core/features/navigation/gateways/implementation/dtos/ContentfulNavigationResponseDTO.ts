import { ContentfulCollectionDTO } from '@/core/shared/dtos';
import { ContentfulNavigationDTO } from './ContentfulNavigationDTO';

export interface ContentfulNavigationResponseDTO {
  navigationCollection: ContentfulCollectionDTO<ContentfulNavigationDTO>;
}
