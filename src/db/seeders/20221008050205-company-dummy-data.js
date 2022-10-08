'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        name: 'NAVER',
        reigion: '경기도 성남',
      },
      {
        name: 'Kakao',
        reigion: '제주도 제주시',
      },
      {
        name: 'Coopang',
        reigion: '서울시 송파구',
      },
    ];

    await queryInterface.bulkInsert('companies', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('companies', null, {});
  },
};
