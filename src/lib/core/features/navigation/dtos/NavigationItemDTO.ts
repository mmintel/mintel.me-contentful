export interface NavigationItemDTO {
  id: string;
  title: string;
  internal: boolean;
  url?: string;
  page?: {
    slug: string;
  };
}
