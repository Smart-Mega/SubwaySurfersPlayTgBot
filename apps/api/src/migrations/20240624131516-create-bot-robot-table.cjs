"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bot_robots", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      owner_type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "bot_users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0
      },
      is_sale: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_selected: {
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
    await queryInterface.dropTable("bot_robots")
  }
}
