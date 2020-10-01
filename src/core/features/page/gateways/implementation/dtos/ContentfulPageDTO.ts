import { ContentfulRecordDTO } from '@/core/shared/dtos';

export interface ContentfulPageDTO extends ContentfulRecordDTO {
  title: string;
  slug: string;
  description: string;
  components: {
    json: any;
  };
  parent?: {
    slug: string;
  };
}
