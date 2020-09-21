import { ContentfulRecordDTO } from '@/core/shared/dtos';

export interface ContentfulNavigationItemDTO extends ContentfulRecordDTO {
  title: string;
  internal: boolean;
  url?: string;
  page?: {
    slug: string;
  };
}
