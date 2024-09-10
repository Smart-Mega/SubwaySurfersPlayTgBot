import { AppConfig } from "./configs"
import { createServer } from "./server"
import { BotUtil, CronJobUtil, DatabaseUtil, SocketUtil } from "./utils"

import http from 'http'
import socketIO from 'socket.io';

const bot = BotUtil();
const port = AppConfig.port
const appServer = createServer(bot)
const httpServer = http.createServer(appServer)

const io = new socketIO.Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const start = async () => {
  try {
      
    CronJobUtil()
    SocketUtil(io)

    await DatabaseUtil.sync().then(() => "Sync")

    httpServer.listen(port, () => {
      console.info(`api is running on ${port}.`)
    })
  } catch (error) {
    console.error(`error occurred: `, error)
    process.exit(1)
  }
}

start()
