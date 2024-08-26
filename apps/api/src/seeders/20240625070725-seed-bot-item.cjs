"use strict"

const { defaultItems, platformItems } = require("../constants/bot.seeder.constant.cjs")

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("bot_items", [...defaultItems, ...platformItems])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("bot_items", null, {})
  }
}
