export declare type IServiceResponse = {
  statusCode: number
  response: {
    status: boolean
    code: number
    message: string
    data?: [] | object
  }
}
