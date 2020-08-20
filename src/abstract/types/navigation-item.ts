export interface NavigationItem {
  id: string;
  title: string;
  internal: boolean;
  url?: string;
  page?: {
    slug: string;
  };
}
