import { Locale } from '@/core/domain';

export interface PageDTO {
  id: string;
  title: string;
  slug: string;
  description: string;
  components: any;
  locale: Locale;
}
