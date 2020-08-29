export interface NavigationItemEntity {
  id: string;
  title: string;
  internal: boolean;
  url?: string;
  page?: {
    slug: string;
  };
}
