import { Locale } from '@/core/domain';

export interface GetPageRequestDTO {
  locale: Locale;
  slug: string;
}
