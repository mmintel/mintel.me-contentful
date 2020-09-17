import { ParsedUrlQuery } from 'querystring';
import { QueryParser } from './QueryParser';

describe('QueryParser', () => {
  it('initializes without crashing', () => {
    expect(() => new QueryParser()).not.toThrow();
  });

  describe('getSlug', () => {
    it('returns null if no query given', () => {
      const parser = new QueryParser();
      expect(parser.getSlug()).toBe(null);
    });

    it('returns null if no slug given', () => {
      const mockQuery: ParsedUrlQuery = {};
      const parser = new QueryParser(mockQuery);
      expect(parser.getSlug()).toBe(null);
    });

    it('returns the slug if given', () => {
      const mockQuery: ParsedUrlQuery = {
        slug: 'foo',
      };
      const parser = new QueryParser(mockQuery);
      expect(parser.getSlug()).toEqual('foo');
    });

    it('concatenates the slug if given as array', () => {
      const mockQuery: ParsedUrlQuery = {
        slug: ['foo', 'bar'],
      };
      const parser = new QueryParser(mockQuery);
      expect(parser.getSlug()).toEqual('foo/bar');
    });
  });

  describe('getLanguage', () => {
    it('returns only de for now', () => {
      const parser = new QueryParser();
      expect(parser.getLanguage()).toEqual('de');
    });
  });
});
