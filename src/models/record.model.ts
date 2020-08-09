export interface Record<T> {
  meta: RecordMeta;
  data: T;
}

export enum Locale {
  DE = 'de-DE',
  EN = 'en-US',
}

interface RecordMeta {
  id: string;
  createdAt: string;
  updatedAt: string;
  locale: Locale;
}
