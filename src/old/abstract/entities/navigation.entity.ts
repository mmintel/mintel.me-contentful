import { RecordEntity } from './record.entity';
import { NavigationItemEntity } from './navigation-item.entity';
import { NavigationName } from '../types/navigation-name';

export interface NavigationEntity extends RecordEntity {
  id: string;
  title: string;
  name: NavigationName;
  items: NavigationItemEntity[];
}
