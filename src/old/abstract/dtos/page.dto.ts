import { ComponentDTO } from './component.dto';
import { RecordDTO } from './record.dto';

export interface PageDTO extends RecordDTO {
  title: string;
  slug: string;
  description: string;
  components: ComponentDTO[];
}
