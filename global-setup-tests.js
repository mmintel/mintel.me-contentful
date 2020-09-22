import faker from 'faker';

module.exports = async () => {
    const seed = faker.random.number();
    faker.seed(seed);

    console.log(`
//////////////////////////
Seeding data with ID: ${seed}
//////////////////////////
    `);
}