import { Navigation, NavigationItem } from '../../../domain';
import { ContentfulNavigationDTO, ContentfulNavigationItemDTO } from '../dtos';
import { ContentfulNavigationMapper } from './ContentfulNavigationMapper';

const mockNavigation: ContentfulNavigationDTO = {
  title: 'foo',
  itemsCollection: {
    items: [],
  },
  name: 'foo',
  sys: {
    id: '213asd',
    firstPublishedAt: 'foo',
    publishedAt: 'foo',
  },
};

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

describe('ContentfulNavigationMapper', () => {
  it('initializes without crashing', () => {
    expect(() => new ContentfulNavigationMapper(mockNavigation)).not.toThrow();
  });

  describe('toDomain', () => {
    it('returns a navigation', () => {
      const mapper = new ContentfulNavigationMapper(mockNavigation);
      expect(mapper.toDomain()).toBeInstanceOf(Navigation);
    });

    it('assigns items', () => {
      const mapper = new ContentfulNavigationMapper({
        ...mockNavigation,
        itemsCollection: {
          items: [mockNavigationItem],
        },
      });
      expect(mapper.toDomain().items[0]).toBeInstanceOf(NavigationItem);
    });
  });
});
