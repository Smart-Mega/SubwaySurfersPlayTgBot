"use strict"

const {
  defaultRobotsAttributes,
  platformRobotsAttributes
} = require("../constants/bot.seeder.constant.cjs")

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("bot_robot_attributes", [
      ...defaultRobotsAttributes,
      ...platformRobotsAttributes
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("bot_robot_attributes", null, {})
  }
}
