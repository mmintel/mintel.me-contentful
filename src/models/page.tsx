import { Document } from '@contentful/rich-text-types';

export interface Page {
  title: string;
  createdAt: string;
  updatedAt: string;
  components: Document;
}
