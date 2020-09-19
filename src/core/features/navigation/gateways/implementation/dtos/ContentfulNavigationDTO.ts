import {
  ContentfulCollectionDTO,
  ContentfulRecordDTO,
} from '@/core/shared/dtos';
import { ContentfulNavigationItemDTO } from './ContentfulNavigationItemDTO';

export interface ContentfulNavigationDTO extends ContentfulRecordDTO {
  title: string;
  name: string;
  itemsCollection: ContentfulCollectionDTO<ContentfulNavigationItemDTO>;
}
