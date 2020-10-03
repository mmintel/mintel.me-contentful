import { ContentfulRecordDTO } from '@/core/shared/dtos';

export interface ContentfulPageDTO extends ContentfulRecordDTO {
  title: string;
  slug: string;
  description: string;
  componentsCollection: {
    items: ContentfulPageComponentDTO[];
  };
  parent?: {
    sys: {
      id: string;
    };
  };
}

export interface ContentfulPageComponentDTO {
  __type: string;
  sys: {
    id: string;
  };
  [key: string]: any;
}
