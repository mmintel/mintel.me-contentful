import { Locale } from '../domain';
import { LocaleParser } from './LocaleParser';

describe('LocaleParser', () => {
  it('initializes without crashing', () => {
    expect(() => new LocaleParser('de')).not.toThrow();
  });

  describe('parse', () => {
    it('returns only Locale.DE for now', () => {
      const parser = new LocaleParser('de');
      expect(parser.parse()).toEqual(Locale.DE);
    });
  });
});
