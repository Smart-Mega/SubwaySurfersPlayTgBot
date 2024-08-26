"use strict"

// const { fakeAllianceMembers } = require("../constants/bot.seeder.constant.cjs")

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert("bot_alliance_members", fakeAllianceMembers)
    // await queryInterface.sequelize.query(
    //   `
    //     UPDATE  bot_alliances
    //     SET     member_count = (
	  //               SELECT  count(id)
	  //               FROM    bot_alliance_members
	  //               WHERE   alliance_id = bot_alliances.id),
	  //             score = (
	  //               SELECT  SUM(exchangeable_point)
	  //               FROM    bot_users
	  //               WHERE   id IN (
    //                 SELECT  user_id
		//                 FROM    bot_alliance_members
		//                 WHERE   alliance_id = bot_alliances.id
    //               )
    //             );
    //   `
    // )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("bot_alliance_members", null, {})

    await queryInterface.sequelize.query(
      `
        UPDATE  bot_alliances
        SET     member_count = 0,
	              score = 0;
      `
    )
  }
}
