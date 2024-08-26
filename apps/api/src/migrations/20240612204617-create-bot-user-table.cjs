"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bot_users", {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      tg_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      tg_avatar: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      },
      tg_username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tg_first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tg_last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      },
      wallet_private_key: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      },
      wallet_public_key: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      },
      exchangeable_point: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      score: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      hourly_reward_point: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      referral_code: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: -1
      },
      is_online: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
        defaultValue: 0
      },
      hourly_rewarded_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      last_online_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
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
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable("bot_users")
  }
}
