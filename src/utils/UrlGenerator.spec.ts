import { UrlGenerator } from './UrlGenerator';

describe('UrlGenerator', () => {
  it('initializes without crashing', () => {
    expect(
      () =>
        new UrlGenerator({
          currentLocale: 'de',
          defaultLocale: 'de',
          homepage: 'home',
        }),
    ).not.toThrow();
  });

  describe('generate', () => {
    it.each([
      ['home', '/'],
      ['about', '/about'],
      ['foo/bar', '/foo/bar'],
    ])('given %p generates %p for default locale', (url, result) => {
      const generator = new UrlGenerator({
        currentLocale: 'en',
        defaultLocale: 'en',
        homepage: 'home',
      });
      expect(generator.generate(url)).toEqual(result);
    });

    it.each([
      ['start', '/de'],
      ['ueber', '/de/ueber'],
      ['foo/bar', '/de/foo/bar'],
    ])('given %p generates %p for default locale', (url, result) => {
      const generator = new UrlGenerator({
        currentLocale: 'de',
        defaultLocale: 'en',
        homepage: 'start',
      });
      expect(generator.generate(url)).toEqual(result);
    });
  });
});
