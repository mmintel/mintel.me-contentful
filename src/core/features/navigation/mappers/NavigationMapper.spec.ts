import { Navigation, NavigationItem } from '../domain';
import { NavigationFixture, NavigationItemFixture } from '../fixtures';
import { NavigationMapper } from './NavigationMapper';

const mockNavigation: Navigation = new NavigationFixture();

describe('NavigationMapper', () => {
  it('initializes without crashing', () => {
    expect(() => new NavigationMapper(mockNavigation)).not.toThrow();
  });

  describe('toDTO', () => {
    it('returns a serialized version', () => {
      const mapper = new NavigationMapper(mockNavigation);
      const dto = mapper.toDTO();
      expect(dto).not.toBeInstanceOf(Navigation);
    });

    it('serializes items', () => {
      const mapper = new NavigationMapper(
        new NavigationFixture({
          items: [new NavigationItemFixture(), new NavigationItemFixture()],
        }),
      );
      const dto = mapper.toDTO();
      expect(dto.items[0]).not.toBeInstanceOf(NavigationItem);
    });
  });
});
