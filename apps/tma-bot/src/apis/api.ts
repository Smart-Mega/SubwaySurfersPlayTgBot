import { retrieveLaunchParams } from "@tma.js/sdk"
import axios, { AxiosInstance } from "axios"

let rlp = { initDataRaw: null }
try {
  rlp = retrieveLaunchParams() as any
} catch (e) {}

const { initDataRaw } = rlp

const baseURL = import.meta.env.VITE_API_URL || ""

const api = () => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: false,
    timeout: 20000,
    timeoutErrorMessage: "Timeout error occurred. Please try again later.",
    headers: {
      Authorization: `ssp ${initDataRaw}`
    }
  })

  return instance
}

export default api
