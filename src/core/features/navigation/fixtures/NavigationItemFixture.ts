import { NavigationItem, NavigationItemProps } from '../domain';
import faker from 'faker';
import { PageFixture } from '../../page/fixtures';

export class NavigationItemFixture extends NavigationItem {
  constructor(overwrites?: Partial<NavigationItemProps>) {
    super({
      id: faker.random.uuid(),
      title: faker.random.word(),
      internal: faker.random.boolean(),
      url: faker.internet.url(),
      page: new PageFixture(),
      ...overwrites,
    });
  }
}
