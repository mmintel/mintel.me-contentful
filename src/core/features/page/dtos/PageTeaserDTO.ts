export interface PageTeaserDTO {
  id: string;
  title: string;
  slug: string;
  parent?: PageTeaserDTO;
}
