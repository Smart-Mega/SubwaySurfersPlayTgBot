
import { BotUserDao } from "@/dao";
import { Server, Socket } from "socket.io"
import DatabaseUtil from "./database.util";
import { differenceInSeconds } from "date-fns";
import { BOT_SCORE_TYPE, BOT_USER_ONLINE_STATUS } from "@repo/util/bot.constant";

const SocketUtil = (io: Server): Server => {
  let user: any = '';
  const botUserDao = new BotUserDao()
  
  const updateUser = async (id:string, is_online:number = 0) => {
    const t = await DatabaseUtil.transaction()
    const now = new Date()

    const userData = await botUserDao.findOne({ where: { id: id } })

    if (userData) {
      const safeUserData = userData.toJSON()

      if (is_online === BOT_USER_ONLINE_STATUS.OFFLINE) {
        const hourlyRewardPoint = safeUserData.hourly_reward_point
        const score = Number(safeUserData.score)
        const lastOnlineAt = safeUserData.last_online_at
        const secondsDifference = differenceInSeconds(now, lastOnlineAt)
        const increasePoint = Number(hourlyRewardPoint * secondsDifference / BOT_SCORE_TYPE.HOURLY_REWARD.unit)

        await botUserDao.update({
            last_online_at: now,
            is_online: is_online,
            hourly_rewarded_at: now,
            score: score + increasePoint
          }, {
            where: { id: id },
            transaction: t
          }
        )

        return await t.commit()
      }

      if (Number(safeUserData.is_online) !== is_online) {
        await botUserDao.update({
            last_online_at: now,
            is_online: is_online
          }, {
            where: { id: id },
            transaction: t
          }
        )
      }
    } 

    
    return await t.commit()
  }
  
  io.on("connection", (socket: Socket) => {
    console.log(`================== New connection ${socket.id} ===============`)
    
    socket.on('user', async (res) => {
      console.log(`================== user ${res?.tg_id} ===============`)
      user = res
      if (user) {
        await updateUser(user.id, 1)
      }
    })

    socket.on("disconnect", async () => {
      console.debug(`================== disconnected ${socket.id} ${user?.tg_id} ===============`)
      // TODO: save disconnected time of user to table.
      if (user) {
        await updateUser(user.id, 0)
      }
    })
  })

  return io
}

export default SocketUtil
