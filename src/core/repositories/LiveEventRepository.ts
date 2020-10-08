import { LifeEvent } from '../domain';

export interface LifeEventRepository {
  getAll(): Promise<LifeEvent[]>;
}
