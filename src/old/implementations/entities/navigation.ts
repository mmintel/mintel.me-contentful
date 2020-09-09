import { Navigation as AbstractNavigation } from '@/old/abstract/entities/navigation';
import { JSONObject } from '@/old/abstract/types';

export class Navigation implements AbstractNavigation {
  constructor(private data: JSONObject) {}

  get createdAt() {
    return this.data.createdAt;
  }
}
