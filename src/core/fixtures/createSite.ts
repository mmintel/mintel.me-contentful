import { Site } from "../domain";
import faker from 'faker';
import { createRecord } from "./createRecord";

export const createSite = (overrides?: Partial<Site>): Site => ({
  ...createRecord(),
  title: faker.lorem.words(),
  avatar: {
    url: faker.image.imageUrl()
  },
  ...overrides,
})
