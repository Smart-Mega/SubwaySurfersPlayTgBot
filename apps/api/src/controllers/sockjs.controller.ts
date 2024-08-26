import { Request, Response } from "express"

export default class SockJsController {

  constructor() {
  }

  refresh = async (req: Request, res: Response) => {
      res.send({})
  }
}