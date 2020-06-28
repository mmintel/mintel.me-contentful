import { Page } from '../../models/page';

export interface ApiClient {
  getPage: (path: string) => Promise<Page>;
  getPages: () => Promise<Page[]>;
}
