import { Json } from '@/types/json.type';

export interface Page {
  title: string;
  slug: string;
  description: string;
  components: Json;
}
