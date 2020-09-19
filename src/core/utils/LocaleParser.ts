import { Locale } from '@/core/domain';

export class LocaleParser {
  constructor(private language: string) {}

  parse(): Locale {
    // TODO implement
    return Locale.DE;
  }
}
