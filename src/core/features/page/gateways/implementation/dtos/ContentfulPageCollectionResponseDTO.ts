import { ContentfulCollectionDTO } from '@/core/shared/dtos';

export interface ContentfulPageCollectionResponseDTO<T> {
  pageCollection: ContentfulCollectionDTO<T>;
}
