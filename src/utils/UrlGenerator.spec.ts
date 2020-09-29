import { UrlGenerator } from './UrlGenerator';

describe('UrlGenerator', () => {
  it('initializes without crashing', () => {
    expect(
      () =>
        new UrlGenerator({
          localeURL: 'de',
          defaultLocaleURL: 'de',
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
        localeURL: 'en',
        defaultLocaleURL: 'en',
        homepage: 'home',
      });
      expect(generator.generate({ slug: url })).toEqual(result);
    });

    it.each([
      ['start', '/de'],
      ['ueber', '/de/ueber'],
      ['foo/bar', '/de/foo/bar'],
    ])('given %p generates %p for non-default locale', (url, result) => {
      const generator = new UrlGenerator({
        localeURL: 'de',
        defaultLocaleURL: 'en',
        homepage: 'start',
      });
      expect(generator.generate({ slug: url })).toEqual(result);
    });

    it('generates the right url with a parent', () => {
      const generator = new UrlGenerator({
        localeURL: 'de',
        defaultLocaleURL: 'en',
        homepage: 'start',
      });
      expect(
        generator.generate({ slug: 'foo', parent: { slug: 'bar' } }),
      ).toEqual('/bar/foo');
    });
  });
});
