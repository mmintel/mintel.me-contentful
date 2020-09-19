import {
  ContentfulAssetDTO,
  ContentfulRecordDTO,
} from '@/core/shared/dtos';

export interface ContentfulSiteDTO extends ContentfulRecordDTO {
  title: string;
  logo: ContentfulAssetDTO;
  homepage: {
    slug: string;
  };
}
