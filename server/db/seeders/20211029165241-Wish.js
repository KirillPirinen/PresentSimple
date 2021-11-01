'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Wishes',
      [
        {
          title: 'test',
          description: 'testtesttesttesttesttest',
          isBinded: false,
          user_id: 1,
          pricerange_id: 1,
          wishlist_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'test',
          description: 'testtesttesttesttesttest',
          isBinded: false,
          user_id: 1,
          pricerange_id: 1,
          wishlist_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'test',
          description: 'testtesttesttesttesttest',
          isBinded: false,
          user_id: 1,
          pricerange_id: 1,
          wishlist_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'test',
          description: 'testte333sttesttesttesttest',
          isBinded: false,
          user_id: 1,
          pricerange_id: 3,
          wishlist_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'test',
          description: 'testtest222testtesttesttest',
          isBinded: false,
          user_id: 1,
          pricerange_id: 2,
          wishlist_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
