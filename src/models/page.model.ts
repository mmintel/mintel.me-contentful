import { Document } from '@contentful/rich-text-types';

export interface Page {
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  components: Document;
}
