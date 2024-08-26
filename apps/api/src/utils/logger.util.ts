import winston from "winston"
import DailyRotateFile from "winston-daily-rotate-file"

import { LogConfig } from "@/configs"

const enumerateErrorFormat = winston.format((info: any) => {
  if (info.message instanceof Error) {
    info.message = {
      message: info.message.message,
      stack: info.message.stack,
      ...info.message
    }
  }

  if (info instanceof Error) {
    return {
      stack: info.stack,
      ...info
    }
  }

  return info
})

const transport = new DailyRotateFile({
  filename: LogConfig.folder + LogConfig.file,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m"
})

const LoggerUtil = winston.createLogger({
  format: winston.format.combine(enumerateErrorFormat(), winston.format.json()),
  transports: [
    transport,
    new winston.transports.Console({
      level: "info"
    })
  ]
})

export default LoggerUtil
