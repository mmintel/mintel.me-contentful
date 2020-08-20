import { Component } from '../types/component';
import { Record } from './record';

export interface Page extends Record {
  title: string;
  slug: string;
  description: string;
  components: Component[];
}
