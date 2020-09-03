export interface NavigationItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  internal: boolean;
  url?: string;
  page?: {
    slug: string;
  };
}
