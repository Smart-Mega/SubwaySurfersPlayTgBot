"use strict"

const { defaultRobots, platformRobots } = require("../constants/bot.seeder.constant.cjs")

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("bot_robots", [...defaultRobots, ...platformRobots])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("bot_robots", null, {})
  }
}
