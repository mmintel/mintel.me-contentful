import { ComponentEntity } from './component.entity';
import { RecordEntity } from './record.entity';

export interface PageEntity extends RecordEntity {
  title: string;
  slug: string;
  description: string;
  components: ComponentEntity[];
}

export type PageSlugs = Pick<PageEntity, 'slug'>;
