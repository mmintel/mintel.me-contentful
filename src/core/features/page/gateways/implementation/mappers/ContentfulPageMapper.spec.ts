import { Page } from '../../../domain';
import { ContentfulPageDTO } from '../dtos/ContentfulPageDTO';
import { createContentfulPage } from '../fixtures';
import { ContentfulPageMapper } from './ContentfulPageMapper';

const mockContentfulPage: ContentfulPageDTO = createContentfulPage();

describe('ContentfulPageMapper', () => {
  it('initializes without crashing', () => {
    expect(() => new ContentfulPageMapper(mockContentfulPage)).not.toThrow();
  });

  describe('toDomain', () => {
    it('returns a page', () => {
      const mapper = new ContentfulPageMapper(mockContentfulPage);
      expect(mapper.toDomain()).toBeInstanceOf(Page);
    });

    it('assigns a parent', () => {
      const mapper = new ContentfulPageMapper({
        ...mockContentfulPage,
        parent: mockContentfulPage,
      });
      expect(mapper.toDomain().parent).toBeInstanceOf(Page);
    });
  });
});
