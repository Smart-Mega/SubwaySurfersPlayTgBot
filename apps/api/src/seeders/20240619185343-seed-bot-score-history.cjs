"use strict"

// const { fakeScoreHistories } = require("../constants/bot.seeder.constant.cjs")

module.exports = {
  async up(queryInterface, Sequelize) {
    // return queryInterface.bulkInsert("bot_score_histories", fakeScoreHistories)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("bot_score_histories", null, {})
  }
}
