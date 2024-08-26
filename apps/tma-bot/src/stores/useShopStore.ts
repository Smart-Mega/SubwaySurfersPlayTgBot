import { toast } from "sonner"
import { create } from "zustand"

import { apiShopGetItems, apiShopGetRobots } from "@/apis/shopApi"

import { CLIENT_MSG } from "@repo/i18n"

interface IShopState {
  loading: boolean

  getRobotsAction: (onSuccessCallback?: (data: any) => void) => void
  getItemsAction: (onSuccessCallback?: (data: any) => void) => void
}

const useShopStore = create<IShopState>()((set, get) => ({
  loading: false,

  getRobotsAction: async (onSuccessCallback) => {
    try {
      set({ loading: true })

      const response = await apiShopGetRobots()

      if (response?.data) {
        const { data } = response.data

        if (typeof onSuccessCallback === "function") {
          onSuccessCallback(data)
        }
      }
    } catch (err: any) {
      console.error(err)

      if (err?.response?.data?.message) {
        toast.error(err.response.data.message)
      } else {
        toast.error(CLIENT_MSG.SOMETHING_WENT_WRONG)
      }
      if (typeof onSuccessCallback === "function") {
        onSuccessCallback({})
      }
    } finally {
      set({ loading: false })
    }
  },

  getItemsAction: async (onSuccessCallback) => {
    try {
      set({ loading: true })

      const response = await apiShopGetItems()

      if (response?.data) {
        const { data } = response.data

        if (typeof onSuccessCallback === "function") {
          onSuccessCallback(data)
        }
      }
    } catch (err: any) {
      console.error(err)

      if (err?.response?.data?.message) {
        toast.error(err.response.data.message)
      } else {
        toast.error(CLIENT_MSG.SOMETHING_WENT_WRONG)
      }
      if (onSuccessCallback) {
        onSuccessCallback({})
      }
    } finally {
      set({ loading: false })
    }
  }
}))

export default useShopStore
