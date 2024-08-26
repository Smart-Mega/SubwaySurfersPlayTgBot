'use strict';

const { defaultTasks } = require("../constants/bot.seeder.constant.cjs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("bot_tasks", defaultTasks)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bot_tasks', null, {});
  }
};
