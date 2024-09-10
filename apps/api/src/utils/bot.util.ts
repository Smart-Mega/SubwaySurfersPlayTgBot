import ShortUniqueId from "short-unique-id"
import { Markup, Telegraf } from "telegraf"
import { type User } from "telegraf/types"

import { AppConfig, TelegramConfig } from "@/configs"
import {
  BotItemAttributeDao,
  BotItemDao,
  BotRobotAttributeDao,
  BotRobotDao,
  BotScoreHistoryDao,
  BotUserDao,
  BotReferralDao
} from "@/dao"

import {
  BOT_EXCHANGEABLE_POINT_TYPE,
  BOT_ITEM_OWNER_TYPES,
  BOT_ROBOT_OWNER_TYPES,
  BOT_SCORE_TYPE,
  BOT_USER_STATUS
} from "@repo/util/bot.constant"
import { BOT_NAME } from "@repo/util/constant"

import DatabaseUtil from "./database.util"

interface ITelegramUser extends User {
  avatar: string
}

const ProcessStart = async (ctx: any) => {
  // console.log("ctx=====>", ctx);
  try {
    // Get telegram account information
    let tgUser: ITelegramUser = { ...ctx.update.message.from, avatar: "" }
//     await ctx.replyWithHTML(`Hey, ${tgUser.username}! It's <b>${BOT_NAME}</b> — Robot Battles! 🚀
// Dive into a world where you can create and upgrade your unique battle robot.
// Launch the app and start earning coins right now! Gather your team, invite friends, and earn additional rewards. More friends mean more rewards! 🌟
  
// Participate in PvP - PvE battles and on the Alliance Arena, upgrade your gear, and become a legend, because winners write history. 🏆
  
// <b>${BOT_NAME}</b> - where your achievements are rewarded! 💰`)
    console.log(tgUser);
    const profilePhotos = await ctx.telegram.getUserProfilePhotos(tgUser.id)
    if (profilePhotos.total_count > 0) {
      const fileId = profilePhotos.photos[0][0].file_id
      const photoUrl = await ctx.telegram.getFileLink(fileId)
      tgUser.avatar = photoUrl.href
    }

    // Parse the referral code from the start command
    const referralCode = ctx.payload;
console.log('re', referralCode)
    // Find or create user
    const t = await DatabaseUtil.transaction()
    const botUserDao = new BotUserDao()
    const botScoreHistoryDao = new BotScoreHistoryDao()
    const botRobotDao = new BotRobotDao()
    const botRobotAttributeDao = new BotRobotAttributeDao()
    const botItemDao = new BotItemDao()
    const botItemAttributeDao = new BotItemAttributeDao()
    const botReferralDao = new BotReferralDao()

    try {
      let user = await botUserDao.findOne({
        where: { tg_id: tgUser.id },
        transaction: t
      })
console.log(1, user)
      let isNewUser:boolean = false
      if (user) {
        // User found
        const safeUser = user.toJSON()

        if (safeUser.status === BOT_USER_STATUS.BLOCKED) {
          await ctx.reply(
            `You have been blocked from using this bot due to violations of our terms of service. If you believe this is a mistake, please contact support.`
          )
        } else {
          await botUserDao.update(
            {
              tg_avatar: tgUser.avatar,
              tg_username: tgUser.username,
              tg_first_name: tgUser.first_name,
              tg_last_name: tgUser.last_name ?? "",
              last_online_at: new Date(),
              is_online: 1
            },
            {
              where: { id: safeUser.id },
              transaction: t
            }
          )
        }
      } else {
        isNewUser = true
        // Create user
        const uid = new ShortUniqueId({ dictionary: "alpha_upper" })
console.log(2)
        const userData = await botUserDao.create(
          {
            tg_id: tgUser.id,
            tg_avatar: tgUser.avatar,
            tg_username: tgUser.username,
            tg_first_name: tgUser.first_name,
            tg_last_name: tgUser.last_name ?? "",
            exchangeable_point: BOT_EXCHANGEABLE_POINT_TYPE.JOIN_REWARD.score,
            score: BOT_SCORE_TYPE.JOIN_REWARD.score + BOT_SCORE_TYPE.HOURLY_REWARD_INITIAL.score,
            referral_code: uid.rnd(6),
            status: BOT_USER_STATUS.ACTIVE,
            hourly_reward_point: BOT_SCORE_TYPE.HOURLY_REWARD.unit,
            last_online_at: new Date(),
            is_online: 1
          },
          { transaction: t }
        )
console.log(3)
        const safeUserData = userData.toJSON()
console.log(4)
        // Running referral system if there is referral code
        if (referralCode) {
          await botReferralDao.create({
              referral_code: referralCode,
              referred_user_id: safeUserData.id,
            }, {
              transaction: t
            }
          )
console.log(5)
          // Add referral score
          let referrer = await botUserDao.findOne({
            where: { referral_code: referralCode },
            transaction: t
          })

          const safeReferer = referrer?.toJSON()

          await botUserDao.update(
            {
              score: Number(safeReferer?.score) + Number(BOT_SCORE_TYPE.REFERRAL_REWARD.score),
            },
            {
              where: { id: safeReferer?.id },
              transaction: t
            }
          )

          // update score history
          let lastReferralReward = await botScoreHistoryDao.findOne({
            where: {
              user_id: safeReferer.id,
              type: BOT_SCORE_TYPE.REFERRAL_REWARD.type
            }
          })

          if (!lastReferralReward) {
            await botScoreHistoryDao.create(
              {
                user_id: safeReferer.id,
                score: BOT_SCORE_TYPE.REFERRAL_REWARD.score,
                type: BOT_SCORE_TYPE.REFERRAL_REWARD.type
              }, {
                transaction: t
              }
            )
          } else {
            const safeLastReferralRewardData = lastReferralReward.toJSON()

            await botScoreHistoryDao.update(
              {
                score: Number(safeLastReferralRewardData.score) + Number(BOT_SCORE_TYPE.REFERRAL_REWARD.score),
              },
              {
                where: { id: safeLastReferralRewardData.id },
                transaction: t
              }
            )
          }

        }

        await botScoreHistoryDao.create(
          {
            user_id: safeUserData.id,
            score: BOT_SCORE_TYPE.JOIN_REWARD.score,
            type: BOT_SCORE_TYPE.JOIN_REWARD.type
          },
          { transaction: t }
        )

        await botScoreHistoryDao.create(
          {
            user_id: safeUserData.id,
            score: BOT_SCORE_TYPE.HOURLY_REWARD_INITIAL.score,
            type: BOT_SCORE_TYPE.HOURLY_REWARD_INITIAL.type
          },
          { transaction: t }
        )

        // Insert robot
        const robotData = await botRobotDao.findOne({
          where: {
            owner_type: BOT_ROBOT_OWNER_TYPES.Default
          },
          transaction: t
        })
        const safeRobotData = robotData.toJSON()

        const robotAttributesData = await botRobotAttributeDao.findAll({
          where: {
            robot_id: safeRobotData.id
          },
          transaction: t
        })

        const newRobotData = await botRobotDao.create(
          {
            owner_type: BOT_ROBOT_OWNER_TYPES.User,
            user_id: safeUserData.id,
            image: safeRobotData.image,
            name: safeRobotData.name,
            score: safeRobotData.score,
            level: safeRobotData.level,
            price: safeRobotData.price,
            is_sale: false,
            is_selected: true
          },
          {
            transaction: t
          }
        )
        const safeNewRobotData = newRobotData.toJSON()

        for (let rad of robotAttributesData) {
          const safeRad = rad.toJSON()
          await botRobotAttributeDao.create(
            {
              robot_id: safeNewRobotData.id,
              attribute_name: safeRad.attribute_name,
              attribute_value: safeRad.attribute_value
            },
            {
              transaction: t
            }
          )
        }

        // Insert items
        const itemsData = await botItemDao.findAll({
          where: {
            owner_type: BOT_ITEM_OWNER_TYPES.Default
          },
          transaction: t
        })

        for (let item of itemsData) {
          const safeItem = item.toJSON()

          const itemAttributesData = await botItemAttributeDao.findAll({
            where: { item_id: safeItem.id },
            transaction: t
          })

          const newItem = await botItemDao.create(
            {
              owner_type: BOT_ITEM_OWNER_TYPES.User,
              user_id: safeUserData.id,
              image: safeItem.image,
              name: safeItem.name,
              price: safeItem.price,
              quantity: safeItem.quantity,
              equipped_quantity: 0,
              sale_quantity: 0,
              type: safeItem.type,
              is_sale: false
            },
            {
              transaction: t
            }
          )
          const safeNewItem = newItem.toJSON()

          for (const itemAttribute of itemAttributesData) {
            const safeItemAttribute = itemAttribute.toJSON()

            await botItemAttributeDao.create(
              {
                item_id: safeNewItem.id,
                attribute_name: safeItemAttribute.attribute_name,
                attribute_value: safeItemAttribute.attribute_value
              },
              { transaction: t }
            )
          }
        }
      }

      await t.commit()

      if (isNewUser && referralCode) await ctx.replyWithHTML(`Referral code is ${referralCode}`)

      await ctx.replyWithHTML(
        `Hey, @${tgUser.username}! It's <b>${BOT_NAME}</b> — Subway surfers play game.
Launch the app and start earning coins right now! Gather your team, invite friends, and earn additional rewards. More friends mean more rewards! 🌟
  
Participate in the game, because winners write history. 🏆
  
<b>${BOT_NAME}</b> - where your achievements are rewarded! 💰`,
        Markup.inlineKeyboard([
          [Markup.button.webApp("Launch", AppConfig.bot_url)],
          [Markup.button.url("Join community", "https://t.me/")]
        ])
      )
    } catch (e: any) {
      console.error(e)
      await t.rollback()

      await ctx.replyWithHTML(
        `Authentication is failed. You are unable to access this bot's services. If you believe this is an error, please contact support for assistance.`
      )
    }
  } catch (e) {
    console.error(e);
    await ctx.replyWithHTML(`Failed to launch <b>${BOT_NAME}</b>!`)
  }
}

const BotUtil = () => {
  const bot = new Telegraf(TelegramConfig.bot_token)
  bot.start(ProcessStart)
  
  bot.launch().catch((error) => {
    console.error("Failed to launch the bot:", error)
  })

  console.info("Bot is set up and running.")
  return bot;
}

export default BotUtil
