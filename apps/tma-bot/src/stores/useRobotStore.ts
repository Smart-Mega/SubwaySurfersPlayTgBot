import { toast } from "sonner"
import { create } from "zustand"

import { apiRobotSetItem } from "@/apis/robotApi"

import { CLIENT_MSG } from "@repo/i18n"

import useAuthStore from "./useAuthStore"

interface IRobotState {
  loading: boolean

  setItemAction: (param: any, onSuccessCallback?: (data: any) => void) => void
}

const useRobotStore = create<IRobotState>()((set, get) => ({
  loading: false,

  setItemAction: async (param, onSuccessCallback) => {
    const { refreshRobotsAndItems } = useAuthStore.getState()

    try {
      set({ loading: true })

      const response = await apiRobotSetItem(param)

      if (response?.data) {
        const { data } = response.data

        refreshRobotsAndItems(data)

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
    } finally {
      set({ loading: false })
    }
  }
}))

export default useRobotStore
