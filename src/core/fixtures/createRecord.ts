import faker from 'faker';
import { Record } from '../definitions';

export const createRecord = (): Record => ({
  sys: {
    id: faker.random.uuid(),
    firstPublishedAt: faker.date.past().toISOString(),
    publishedAt: faker.date.past().toISOString(),
  }
})
