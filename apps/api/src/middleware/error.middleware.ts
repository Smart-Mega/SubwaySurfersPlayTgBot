import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"

import { AppConfig } from "@/configs"
import { ErrorHelper } from "@/helpers"
import { LoggerUtil } from "@/utils"

export const errorHandler = (err: any, req: Request, res: Response) => {
  let { statusCode, message } = err

  if (AppConfig.node_env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
  }

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
    ...(AppConfig.node_env === "development" && { stack: err.stack })
  }

  if (AppConfig.node_env === "development") {
    LoggerUtil.error(err)
  }

  res.status(statusCode).send(response)
}

export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err

  if (!(error instanceof ErrorHelper)) {
    const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode]
    error = new ErrorHelper(statusCode, message, false, err.stack)
  }

  errorHandler(error, req, res)

  next(error)
}
