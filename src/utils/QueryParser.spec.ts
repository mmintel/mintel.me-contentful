import { locales } from '@/config';
import { Locale } from '@/core/domain';
import { ParsedUrlQuery } from 'querystring';
import { QueryParser } from './QueryParser';

const mockLocales: Locale[] = [
  {
    name: 'de',
    url: 'de',
    value: 'de-DE',
  },
  {
    name: 'en',
    url: 'en',
    value: 'en-GB',
  },
];

describe('QueryParser', () => {
  it('initializes without crashing', () => {
    expect(
      () =>
        new QueryParser({
          locales: mockLocales,
          defaultLocale: {
            name: 'de',
            value: 'de-DE',
            url: 'de',
          },
        }),
    ).not.toThrow();
  });

  describe('getSlug', () => {
    it('returns undefined if no query given', () => {
      const parser = new QueryParser({
        locales: mockLocales,
        defaultLocale: {
          name: 'de',
          value: 'de-DE',
          url: 'de',
        },
      });
      expect(parser.getSlug()).toBe(undefined);
    });

    it('returns undefined if no slug given', () => {
      const mockQuery: ParsedUrlQuery = {};
      const parser = new QueryParser({
        locales: mockLocales,
        defaultLocale: {
          name: 'de',
          value: 'de-DE',
          url: 'de',
        },
        query: mockQuery,
      });
      expect(parser.getSlug()).toBe(undefined);
    });

    it('returns the slug if given', () => {
      const mockQuery: ParsedUrlQuery = {
        slug: 'foo',
      };
      const parser = new QueryParser({
        locales: mockLocales,
        defaultLocale: {
          name: 'de',
          value: 'de-DE',
          url: 'de',
        },
        query: mockQuery,
      });
      expect(parser.getSlug()).toEqual('foo');
    });

    it('concatenates the slug if given as array', () => {
      const mockQuery: ParsedUrlQuery = {
        slug: ['foo', 'bar'],
      };
      const parser = new QueryParser({
        locales: mockLocales,
        defaultLocale: {
          name: 'de',
          value: 'de-DE',
          url: 'de',
        },
        query: mockQuery,
      });
      expect(parser.getSlug()).toEqual('foo/bar');
    });

    it('returns the slug without a locale', () => {
      const mockQuery: ParsedUrlQuery = {
        slug: ['de', 'foo', 'bar'],
      };
      const parser = new QueryParser({
        locales: mockLocales,
        defaultLocale: {
          name: 'de',
          value: 'de-DE',
          url: 'de',
        },
        query: mockQuery,
      });
      expect(parser.getSlug()).toEqual('foo/bar');
    });

    describe('ignores the slug if', () => {
      it('is a locale', () => {
        const mockQuery: ParsedUrlQuery = {
          slug: 'de',
        };
        const parser = new QueryParser({
          locales: mockLocales,
          defaultLocale: {
            name: 'de',
            value: 'de-DE',
            url: 'de',
          },
          query: mockQuery,
        });
        expect(parser.getSlug()).toEqual(undefined);
      });

      it('is a locale on the first position of an array', () => {
        const mockQuery: ParsedUrlQuery = {
          slug: ['de'],
        };
        const parser = new QueryParser({
          locales: mockLocales,
          defaultLocale: {
            name: 'de',
            value: 'de-DE',
            url: 'de',
          },
          query: mockQuery,
        });
        expect(parser.getSlug()).toEqual(undefined);
      });
    });
  });

  describe('getLocale', () => {
    it('returns defaultLocale if no language is present', () => {
      const mockQuery: ParsedUrlQuery = {
        slug: ['foo', 'bar'],
      };
      const parser = new QueryParser({
        locales: mockLocales,
        defaultLocale: {
          name: 'de',
          value: 'de-DE',
          url: 'de',
        },
        query: mockQuery,
      });
      expect(parser.getLocale()).toEqual('de-DE');
    });

    it('returns locale if found', () => {
      const mockQuery: ParsedUrlQuery = {
        slug: 'de',
      };
      const parser = new QueryParser({
        locales: mockLocales,
        defaultLocale: {
          value: 'en-US',
          name: 'en',
          url: 'en',
        },
        query: mockQuery,
      });
      expect(parser.getLocale()).toEqual('de-DE');
    });

    it('returns locale if found at the first position of an array', () => {
      const mockQuery: ParsedUrlQuery = {
        slug: ['de', 'foo', 'bar'],
      };
      const parser = new QueryParser({
        locales: mockLocales,
        defaultLocale: {
          value: 'en-US',
          name: 'en',
          url: 'en',
        },
        query: mockQuery,
      });
      expect(parser.getLocale()).toEqual('de-DE');
    });
  });
});
