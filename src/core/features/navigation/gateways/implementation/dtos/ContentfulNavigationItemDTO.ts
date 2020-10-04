import { ContentfulRelationDTO } from '@/core/shared/dtos';

export interface ContentfulNavigationItemDTO {
  title: string;
  internal: boolean;
  url?: string;
  page?: ContentfulRelationDTO;
  sys: {
    id: string;
  };
}
