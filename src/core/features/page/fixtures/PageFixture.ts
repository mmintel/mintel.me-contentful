import { Page, PageProps } from '../domain';
import faker from 'faker';

export class PageFixture extends Page {
  constructor(overwrites?: Partial<PageProps>) {
    super({
      id: faker.random.uuid(),
      title: faker.random.word(),
      description: faker.random.words(),
      slug: faker.lorem.slug(),
      components: [],
      ...overwrites,
    });
  }
}
