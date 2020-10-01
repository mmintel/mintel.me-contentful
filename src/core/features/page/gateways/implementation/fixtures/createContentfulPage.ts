import faker from 'faker';
import { ContentfulPageDTO } from '../dtos/ContentfulPageDTO';

export const createContentfulPage = (
  overwrites?: Partial<ContentfulPageDTO>,
): ContentfulPageDTO => ({
  title: faker.random.word(),
  description: faker.random.words(),
  slug: faker.lorem.slug(),
  components: {
    json: {},
  },
  sys: {
    id: faker.random.uuid(),
    firstPublishedAt: faker.date.past().toDateString(),
    publishedAt: faker.date.past().toDateString(),
  },
  ...overwrites,
});
