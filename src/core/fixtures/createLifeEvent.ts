import { LifeEvent } from "../domain";
import faker from 'faker';
import { createRecord } from "./createRecord";

export const createLifeEvent = (overrides?: Partial<LifeEvent>): LifeEvent => ({
  ...createRecord(),
  title: faker.lorem.words(),
  description: faker.lorem.sentences(),
  month: faker.random.number(),
  year: faker.random.number(),
  ...overrides,
})
