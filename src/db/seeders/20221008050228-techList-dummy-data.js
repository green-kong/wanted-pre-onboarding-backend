'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {tech: 'Node.js'},
      {tech: 'Javascript'},
      {tech: 'typescript'},
      {tech: 'python'},
      {tech: 'java'},
      {tech: 'express'},
    ];

    await queryInterface.bulkInsert('techLists', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('techLists', null, {});
  },
};
