import {
  ContentfulCollectionDTO,
  ContentfulRecordDTO,
} from '@/lib/implementations/dtos';
import { ContentfulNavigationItemDTO } from './ContentfulNavigationItemDTO';

export interface ContentfulNavigationDTO extends ContentfulRecordDTO {
  title: string;
  name: string;
  itemsCollection: ContentfulCollectionDTO<ContentfulNavigationItemDTO>;
}
