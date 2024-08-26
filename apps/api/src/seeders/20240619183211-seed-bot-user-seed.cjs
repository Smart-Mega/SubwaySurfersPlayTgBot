"use strict"

// const { fakeUsers } = require("../constants/bot.seeder.constant.cjs")

module.exports = {
  async up(queryInterface, Sequelize) {
    // return queryInterface.bulkInsert("bot_users", fakeUsers)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("bot_users", null, {})
  }
}
