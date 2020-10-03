import { Navigation } from '../../../domain';
import { ContentfulNavigationDTO } from '../dtos';
import { ContentfulNavigationMapper } from './ContentfulNavigationMapper';

const mockNavigation: ContentfulNavigationDTO = {
  title: 'foo',
  itemsCollection: {
    items: [],
  },
  name: 'foo',
  sys: {
    id: '213asd',
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
  });
});
