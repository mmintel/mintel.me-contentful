import faker from 'faker';

// export const useApp = jest.fn().mockReturnValue({
//   site: {
//     title: faker.random.words(),
//   },
// });

export const useApp = () => {
  return {
    site: {
      title: 'foo',
    },
  };
};
