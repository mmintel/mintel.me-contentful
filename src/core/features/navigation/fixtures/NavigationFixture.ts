import { Navigation, NavigationProps } from "../domain";
import faker from 'faker';

export class NavigationFixture extends Navigation {
    constructor(overwrites?: Partial<NavigationProps>) {
        super({
            id: faker.random.uuid(),
            name: faker.random.word(),
            title: faker.random.word(),
            items: [],
            ...overwrites,
        })
    }
}