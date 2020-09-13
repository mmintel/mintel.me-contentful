import { Locale } from '@/lib/core/domain';
import { LocaleParser } from '@/lib/core/utils';

export class LocaleParserImpl implements LocaleParser {
  constructor(private language: string) {}

  parse(): Locale {
    // TODO implement
    return Locale.DE;
  }
}
