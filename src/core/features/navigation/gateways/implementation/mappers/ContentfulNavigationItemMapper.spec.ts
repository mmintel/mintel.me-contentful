import { Page } from '@/core/features/page/domain';
import { NavigationItem } from '../../../domain';
import { ContentfulNavigationItemDTO } from '../dtos';
import { ContentfulNavigationItemMapper } from './ContentfulNavigationItemMapper';

const mockNavigationItem: ContentfulNavigationItemDTO = {
  title: 'foo',
  internal: true,
  page: {
    description: 'foo',
    title: 'foo',
    components: {
      json: {},
    },
    slug: 'foo',
    sys: {
      id: '213123',
      firstPublishedAt: 'foo',
      publishedAt: 'foo',
    },
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

    it('assigns a page', () => {
      const mapper = new ContentfulNavigationItemMapper(mockNavigationItem);
      const navigationItem = mapper.toDomain();
      expect(navigationItem.page).toBeInstanceOf(Page);
    });

    it('maps correct fields', () => {
      const mapper = new ContentfulNavigationItemMapper(mockNavigationItem);
      const navigationItem = mapper.toDomain();
      expect(navigationItem.id).toEqual(mockNavigationItem.sys.id);
      expect(navigationItem.internal).toEqual(mockNavigationItem.internal);
      expect(navigationItem.title).toEqual(mockNavigationItem.title);
      expect(navigationItem.url).toEqual(mockNavigationItem.url);
    });
  });
});
