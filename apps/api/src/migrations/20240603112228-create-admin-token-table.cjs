"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("admin_tokens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING
      },
      admin_uuid: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID
      },
      type: {
        type: Sequelize.STRING
      },
      blacklisted: {
        type: Sequelize.BOOLEAN
      },
      expires: {
        allowNull: false,
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("admin_tokens")
  }
}
