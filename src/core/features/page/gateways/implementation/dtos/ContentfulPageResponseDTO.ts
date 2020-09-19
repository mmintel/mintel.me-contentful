import { ContentfulCollectionDTO } from '@/core/shared/dtos';
import { ContentfulPageDTO } from './ContentfulPageDTO';

export interface ContentfulPageResponseDTO {
  pageCollection: ContentfulCollectionDTO<ContentfulPageDTO>;
}
