import { Record } from '../definitions';

export interface LifeEvent extends Record {
  title?: string;
  description?: string;
  month?: number;
  year?: number;
}
