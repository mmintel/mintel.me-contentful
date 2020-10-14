import { Site } from '../domain';

export interface SiteRepository {
  get(): Promise<Site>;
}
