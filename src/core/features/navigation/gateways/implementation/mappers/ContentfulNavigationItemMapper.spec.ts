import { NavigationItem } from '../../../domain';
import { ContentfulNavigationItemDTO } from '../dtos';
import { ContentfulNavigationItemMapper } from './ContentfulNavigationItemMapper';

const mockNavigationItem: ContentfulNavigationItemDTO = {
  title: 'foo',
  internal: true,
  page: {
    slug: 'foo',
  },
  sys: {
    id: '213asd',
    firstPublishedAt: 'foo',
    publishedAt: 'foo',
  },
};

describe('ContentfulNavigationItemMapper', () => {
  it('initializes without crashing', () => {
    expect(
      () => new ContentfulNavigationItemMapper(mockNavigationItem),
    ).not.toThrow();
  });

  describe('toDomain', () => {
    it('returns a NavigationItem', () => {
      const mapper = new ContentfulNavigationItemMapper(mockNavigationItem);
      const navigationItem = mapper.toDomain();
      expect(navigationItem).toBeInstanceOf(NavigationItem);
    });

    it('maps correct fields', () => {
      const mapper = new ContentfulNavigationItemMapper(mockNavigationItem);
      const navigationItem = mapper.toDomain();
      expect(navigationItem.id).toEqual(mockNavigationItem.sys.id);
      expect(navigationItem.internal).toEqual(mockNavigationItem.internal);
      expect(navigationItem.page).toEqual(mockNavigationItem.page?.slug);
      expect(navigationItem.title).toEqual(mockNavigationItem.title);
      expect(navigationItem.url).toEqual(mockNavigationItem.url);
    });
  });
});
