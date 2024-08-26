import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"

import { ErrorHelper } from "@/helpers"

export const roles =
  (roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    new Promise((resolve, reject) => {
      if (roles.includes(req.userInfo?.role ?? "")) {
        resolve(req)
      } else {
        reject(new ErrorHelper(httpStatus.FORBIDDEN, "Permission denied"))
      }
    })
      .then(() => next())
      .catch((err) => {
        next(err)
      })
  }
