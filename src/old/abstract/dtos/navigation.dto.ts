import { RecordDTO } from './record.dto';
import { NavigationItemDTO } from './navigation-item.dto';

export interface NavigationDTO extends RecordDTO {
  id: string;
  title: string;
  name: string;
  items: NavigationItemDTO[];
}
