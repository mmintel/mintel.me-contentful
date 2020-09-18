import { ContentfulCollectionDTO } from '@/lib/implementations/dtos';
import { ContentfulNavigationDTO } from './ContentfulNavigationDTO';

export interface ContentfulNavigationResponseDTO {
  navigationCollection: ContentfulCollectionDTO<ContentfulNavigationDTO>;
}
