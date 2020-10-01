import { Page } from '../../../domain';
import { ContentfulPageDTO } from '../dtos/ContentfulPageDTO';
import { ContentfulPageMapper } from './ContentfulPageMapper';

const mockContentfulPage: ContentfulPageDTO = {
  title: 'foo',
  components: {
    json: {},
  },
  description: 'foo',
  slug: 'foo/bar',
  sys: {
    id: '213asd',
    firstPublishedAt: 'foo',
    publishedAt: 'foo',
  },
};

describe('ContentfulPageMapper', () => {
  it('initializes without crashing', () => {
    expect(() => new ContentfulPageMapper(mockContentfulPage)).not.toThrow();
  });

  describe('toDomain', () => {
    it('returns a page', () => {
      const mapper = new ContentfulPageMapper(mockContentfulPage);
      expect(mapper.toDomain()).toBeInstanceOf(Page);
    });
  });
});
