import { Component } from './component';

export interface Page {
  title: string;
  slug: string;
  description: string;
  components: Component[];
}
