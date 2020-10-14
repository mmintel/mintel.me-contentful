import { Technology } from '../domain';

export interface TechnologyRepository {
  getAllHighlighted(): Promise<Technology[]>;
}
