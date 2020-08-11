export interface Page {
  title: string;
  slug: string;
  description: string;
  components: any; // must fit structure of blocks expected in frontend
}

export type PageTeaser = Pick<Page, 'slug'>;
