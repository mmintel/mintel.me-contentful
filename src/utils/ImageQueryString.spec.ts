import { ImageQueryString } from './ImageQueryString';

describe('ContentfulImageQueryString', () => {
  it('initializes without crashing', () => {
    expect(() => new ImageQueryString()).not.toThrow();
  });

  describe('value', () => {
    it('returns empty string per default', () => {
      const queryString = new ImageQueryString();
      expect(queryString.value).toEqual('');
    });
  });

  it('adds multiple values', () => {
    const queryString = new ImageQueryString();
    queryString.setWidth(100);
    queryString.setHeight(50);
    expect(queryString.value).toEqual('?w=100&h=50');
  });

  describe('setWidth', () => {
    it('adds the width', () => {
      const queryString = new ImageQueryString();
      queryString.setWidth(100);
      expect(queryString.value).toEqual('?w=100');
    });
  });

  describe('setHeight', () => {
    it('adds the height', () => {
      const queryString = new ImageQueryString();
      queryString.setHeight(100);
      expect(queryString.value).toEqual('?h=100');
    });
  });
});
