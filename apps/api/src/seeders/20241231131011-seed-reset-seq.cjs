"use strict"

const { fakeScoreHistories } = require("../constants/bot.seeder.constant.cjs")

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `SELECT setval('bot_users_id_seq', (SELECT MAX(id) FROM bot_users) + 1);`
    )

    await queryInterface.sequelize.query(
      `SELECT setval('bot_score_histories_id_seq', (SELECT MAX(id) FROM bot_score_histories) + 1);`
    )

    await queryInterface.sequelize.query(
      `SELECT setval('bot_robots_id_seq', (SELECT MAX(id) FROM bot_robots) + 1);`
    )

    await queryInterface.sequelize.query(
      `SELECT setval('bot_items_id_seq', (SELECT MAX(id) FROM bot_items) + 1);`
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`SELECT setval('bot_users_id_seq', 1);`)

    await queryInterface.sequelize.query(`SELECT setval('bot_score_histories_id_seq', 1);`)

    await queryInterface.sequelize.query(`SELECT setval('bot_robots_id_seq', 1);`)

    await queryInterface.sequelize.query(`SELECT setval('bot_items_id_seq', 1);`)
  }
}
