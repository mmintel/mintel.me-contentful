import { Technology } from "../domain";
import faker from 'faker';
import { createRecord } from "./createRecord";

export const createTechnology = (overrides?: Partial<Technology>): Technology => ({
  ...createRecord(),
  title: faker.lorem.words(),
  icon: {
    url: faker.image.imageUrl(),
  },
  ...overrides,
})
