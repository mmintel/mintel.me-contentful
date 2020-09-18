import { ContentfulRecordDTO } from '@/lib/implementations/dtos';

export interface ContentfulNavigationItemDTO extends ContentfulRecordDTO {
  title: string;
  url: string;
  internal: boolean;
  page: {
    slug: string;
  };
}
