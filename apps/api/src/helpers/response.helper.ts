import { IServiceResponse } from "@/types/service"

const error = (statusCode: number, message: string) => {
  const response: IServiceResponse = {
    statusCode,
    response: {
      status: false,
      code: statusCode,
      message
    }
  }
  return response
}

const success = (statusCode: number, message: string, data?: [] | object) => {
  const response: IServiceResponse = {
    statusCode,
    response: {
      status: true,
      code: statusCode,
      message,
      data
    }
  }
  return response
}

export default {
  error,
  success
}
