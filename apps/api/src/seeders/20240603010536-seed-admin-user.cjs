"use strict"

const { adminUsers } = require("../constants/admin.seeder.constant.cjs")

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("admin_users", adminUsers)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("admin_users", null, {})
  }
}
