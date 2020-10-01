import { Locale } from '@/core/domain';
import { ParsedUrlQuery } from 'querystring';
import { QueryParser } from './QueryParser';

const mockDELocale = {
  name: 'de',
  value: 'de-DE',
  url: 'de',
};

const mockENLocale = {
  name: 'en',
  value: 'en-US',
  url: 'en',
};

const mockLocales: Locale[] = [mockDELocale, mockENLocale];

describe('QueryParser', () => {
  it('initializes without crashing', () => {
    expect(
      () =>
        new QueryParser({
          locales: mockLocales,
          defaultLocale: mockDELocale,
        }),
    ).not.toThrow();
  });

  describe('getSlug', () => {
    it('returns undefined if no query given', () => {
      const parser = new QueryParser({
        locales: mockLocales,
        defaultLocale: mockDELocale,
      });
      expect(parser.getSlug()).toBe(undefined);
    });

    it('returns undefined if no slug given', () => {
      const mockQuery: ParsedUrlQuery = {};
      const parser = new QueryParser({
        locales: mockLocales,
        defaultLocale: mockDELocale,
        query: mockQuery,
      });
      expect(parser.getSlug()).toBe(undefined);
    });

    describe('if slug is given as string', () => {
      it('returns the slug', () => {
        const mockQuery: ParsedUrlQuery = {
          slug: 'foo',
        };
        const parser = new QueryParser({
          locales: mockLocales,
          defaultLocale: mockDELocale,
          query: mockQuery,
        });
        expect(parser.getSlug()).toEqual('foo');
      });

      it('ignores the slug if it is a locale', () => {
        const mockQuery: ParsedUrlQuery = {
          slug: 'de',
        };
        const parser = new QueryParser({
          locales: mockLocales,
          defaultLocale: mockDELocale,
          query: mockQuery,
        });
        expect(parser.getSlug()).toEqual(undefined);
      });
    });

    describe('if slug is given as array', () => {
      it('returns only the last part', () => {
        const mockQuery: ParsedUrlQuery = {
          slug: ['foo', 'bar'],
        };
        const parser = new QueryParser({
          locales: mockLocales,
          defaultLocale: mockDELocale,
          query: mockQuery,
        });
        expect(parser.getSlug()).toEqual('bar');
      });

      it('ignores the slug if it is a locale', () => {
        const mockQuery: ParsedUrlQuery = {
          slug: ['de'],
        };
        const parser = new QueryParser({
          locales: mockLocales,
          defaultLocale: mockDELocale,
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
        defaultLocale: mockDELocale,
        query: mockQuery,
      });
      expect(parser.getLocale()).toEqual(mockDELocale);
    });

    it('returns locale if found', () => {
      const mockQuery: ParsedUrlQuery = {
        slug: 'de',
      };
      const parser = new QueryParser({
        locales: mockLocales,
        defaultLocale: mockENLocale,
        query: mockQuery,
      });
      expect(parser.getLocale()).toEqual(mockDELocale);
    });

    it('returns locale if found at the first position of an array', () => {
      const mockQuery: ParsedUrlQuery = {
        slug: ['de', 'foo', 'bar'],
      };
      const parser = new QueryParser({
        locales: mockLocales,
        defaultLocale: mockENLocale,
        query: mockQuery,
      });
      expect(parser.getLocale()).toEqual(mockDELocale);
    });
  });
});
