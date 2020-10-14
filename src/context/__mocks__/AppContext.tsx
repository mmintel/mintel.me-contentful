import faker from 'faker';

export const useApp = jest.fn().mockReturnValue({
  site: {
    title: faker.random.words(),
  },
});
