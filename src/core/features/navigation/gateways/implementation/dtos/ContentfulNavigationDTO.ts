import {
  ContentfulCollectionDTO,
  ContentfulRelationDTO,
} from '@/core/shared/dtos';

export interface ContentfulNavigationDTO {
  title: string;
  name: string;
  itemsCollection: ContentfulCollectionDTO<ContentfulRelationDTO>;
  sys: {
    id: string;
  };
}
