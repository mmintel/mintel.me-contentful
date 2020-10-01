import { Page } from './Page';

const props = {
  id: 'foo',
  components: {
    json: {},
  },
  description: 'foo',
  slug: 'foo',
  title: 'foo',
};

describe('Page', () => {
  it('initializes without crashing', () => {
    expect(() => new Page(props)).not.toThrow();
  });

  describe('addGeneration', () => {
    it('adds a parent if none exists', () => {
      const page = new Page(props);
      const parent = new Page({
        ...props,
        id: 'bar',
      });
      page.addGeneration(parent);
      expect(page.parent!.id).toEqual(parent.id);
    });

    it('adds multiple parents', () => {
      const page = new Page(props);
      const parent = new Page({
        ...props,
        id: 'bar',
      });
      const grandParent = new Page({
        ...props,
        id: 'baz',
      });
      page.addGeneration(parent);
      page.addGeneration(grandParent);
      expect(page.parent!.id).toEqual(parent.id);
      expect(page.parent!.parent!.id).toEqual(grandParent.id);
    });
  });
});
