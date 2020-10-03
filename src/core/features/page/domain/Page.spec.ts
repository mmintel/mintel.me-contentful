import { Page, PageProps } from './Page';

const props: PageProps = {
  id: 'foo',
  components: [],
  description: 'foo',
  slug: 'foo',
  title: 'foo',
};

describe('Page', () => {
  it('initializes without crashing', () => {
    expect(() => new Page(props)).not.toThrow();
  });

  describe('setParent', () => {
    it('sets a parent', () => {
      const page = new Page(props);
      const parent = new Page({
        ...props,
        id: 'bar',
      });
      page.setParent(parent);
      expect(page.parent!.id).toEqual(parent.id);
    });
  });
});
