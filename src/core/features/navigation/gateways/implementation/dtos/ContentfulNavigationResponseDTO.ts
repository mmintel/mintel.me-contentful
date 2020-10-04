import { ContentfulCollectionDTO } from '@/core/shared/dtos';

export interface ContentfulNavigationResponseDTO<T> {
  navigationCollection: ContentfulCollectionDTO<T>;
}
