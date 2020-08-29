import { Navigation as AbstractNavigation } from '@/abstract/entities/navigation';
import { JSONObject } from '@/abstract/types';

export class Navigation implements AbstractNavigation {
  constructor(private data: JSONObject) {}

  get createdAt() {
    return this.data.createdAt;
  }
}
