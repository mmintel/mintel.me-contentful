export type PageTeaser = {
  slug: string;
  parent: PageTeaser | null;
};

export interface NavigationItemDTO {
  id: string;
  title: string;
  internal: boolean;
  url: string | null;
  page: PageTeaser | null;
}
