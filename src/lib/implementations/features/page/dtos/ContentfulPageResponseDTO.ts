import { ContentfulCollectionDTO } from '@/lib/implementations/dtos';
import { ContentfulPageDTO } from './ContentfulPageDTO';

export interface ContentfulPageResponseDTO {
  pageCollection: ContentfulCollectionDTO<ContentfulPageDTO>;
}
