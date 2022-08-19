'use strict';
const { faker }= require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const items = generateFakerItems(10)
    await queryInterface.bulkInsert('Users',
      items
      , {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users', null, {});
  }
};


function generateFakerItems(rowCount) {
  const data = []

  for (let i = 0; i < rowCount; i++) {
    const newItem = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      status: 'active',
      createdAt: new Date,
      updatedAt: new Date
    }

    data.push(newItem)
  }
  return data;
}
