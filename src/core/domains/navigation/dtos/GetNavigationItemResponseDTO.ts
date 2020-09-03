export interface NavigationItemResponseDTO {
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
