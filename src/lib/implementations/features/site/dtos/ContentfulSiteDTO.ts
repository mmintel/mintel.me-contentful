import {
  ContentfulAssetDTO,
  ContentfulRecordDTO,
} from '@/lib/implementations/dtos';

export interface ContentfulSiteDTO extends ContentfulRecordDTO {
  title: string;
  logo: ContentfulAssetDTO;
}
