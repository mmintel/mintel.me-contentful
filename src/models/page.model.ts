export interface Page {
  title: string;
  slug: string;
  description: string;
  components: Component[];
}

export interface Component {
  id: string;
}

export type PageTeaser = Pick<Page, 'slug'>;
