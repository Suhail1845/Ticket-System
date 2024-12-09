'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the updatedAt column exists before trying to remove it
    const columns = await queryInterface.describeTable('Tickets');
    if (columns.updatedAt) {
      await queryInterface.removeColumn('Tickets', 'updatedAt');
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Optionally, you can add the column back if you ever need to roll back
    const columns = await queryInterface.describeTable('Tickets');
    if (!columns.updatedAt) {
      await queryInterface.addColumn('Tickets', 'updatedAt', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
  },
};
