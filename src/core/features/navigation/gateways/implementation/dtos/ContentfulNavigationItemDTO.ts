import { ContentfulRecordDTO } from '@/core/shared/dtos';

export interface ContentfulNavigationItemDTO extends ContentfulRecordDTO {
  title: string;
  url: string;
  internal: boolean;
  page: {
    slug: string;
  };
}
