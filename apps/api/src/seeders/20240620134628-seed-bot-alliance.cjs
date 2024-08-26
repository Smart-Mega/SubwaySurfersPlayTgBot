"use strict"

// const { fakeAlliances } = require("../constants/bot.seeder.constant.cjs")

module.exports = {
  async up(queryInterface, Sequelize) {
    // return queryInterface.bulkInsert("bot_alliances", fakeAlliances)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("bot_alliances", null, {})
  }
}
