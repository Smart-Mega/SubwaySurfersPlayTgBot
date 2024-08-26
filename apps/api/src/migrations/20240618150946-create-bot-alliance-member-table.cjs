"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bot_alliance_members", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      alliance_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "bot_alliances",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "bot_users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      is_leader: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable("bot_alliance_members")
  }
}
