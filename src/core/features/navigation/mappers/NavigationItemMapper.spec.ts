import { Page } from '../../page/domain';
import { NavigationItem } from '../domain';
import { NavigationItemFixture } from '../fixtures';
import { NavigationItemMapper } from './NavigationItemMapper';

const mockNavigationItem: NavigationItem = new NavigationItemFixture();

describe('NavigationItemMapper', () => {
  it('initializes without crashing', () => {
    expect(() => new NavigationItemMapper(mockNavigationItem)).not.toThrow();
  });

  describe('toDTO', () => {
    it('returns a serialized version', () => {
      const mapper = new NavigationItemMapper(mockNavigationItem);
      const dto = mapper.toDTO();
      expect(dto).not.toBeInstanceOf(NavigationItem);
    });

    it('serializes a page', () => {
      const mapper = new NavigationItemMapper(mockNavigationItem);
      const dto = mapper.toDTO();
      expect(dto.page).not.toBeInstanceOf(Page);
    });
  });
});
