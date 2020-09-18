import { ContentfulRecordDTO } from '@/lib/implementations/dtos';

export interface ContentfulPageDTO extends ContentfulRecordDTO {
  title: string;
  slug: string;
  description: string;
  components: {
    json: any;
  };
}
