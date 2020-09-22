import { NavigationItem, NavigationItemProps } from "../domain";
import faker from 'faker';

export class NavigationItemFixture extends NavigationItem {
    constructor(overwrites?: Partial<NavigationItemProps>) {
        super({
            id: faker.random.uuid(),
            title: faker.random.word(),
            page: faker.lorem.slug(),
            internal: faker.random.boolean(),
            url: faker.internet.url(),
            ...overwrites,
        })
    }
}