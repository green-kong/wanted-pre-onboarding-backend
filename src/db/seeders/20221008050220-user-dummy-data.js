'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        userId: 'kong',
      },
      {
        userId: 'peanut',
      },
      {
        userId: 'greenBean',
      },
    ];

    await queryInterface.bulkInsert('users', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
