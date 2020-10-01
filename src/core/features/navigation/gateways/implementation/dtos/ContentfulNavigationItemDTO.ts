import { ContentfulPageDTO } from '@/core/features/page/gateways/implementation/dtos/ContentfulPageDTO';
import { ContentfulRecordDTO } from '@/core/shared/dtos';

export interface ContentfulNavigationItemDTO extends ContentfulRecordDTO {
  title: string;
  internal: boolean;
  url?: string;
  page?: ContentfulPageDTO;
}
