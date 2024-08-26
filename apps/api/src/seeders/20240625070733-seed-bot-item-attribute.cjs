"use strict"

const {
  defaultItemAttributes,
  platformItemAttributes
} = require("../constants/bot.seeder.constant.cjs")

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("bot_item_attributes", [
      ...defaultItemAttributes,
      ...platformItemAttributes
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("bot_item_attributes", null, {})
  }
}
