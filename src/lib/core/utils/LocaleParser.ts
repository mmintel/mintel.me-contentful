import { Locale } from '../domain';

export interface LocaleParser {
  parse(): Locale;
}
