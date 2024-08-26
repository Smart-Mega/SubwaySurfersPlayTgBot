import { create } from "zustand"

import { apiAllianceGet, apiAllianceGetList } from "@/apis/allianceApi"

import { CLIENT_MSG } from "@repo/i18n"
import { toast } from "sonner"

interface IAllianceState {
  loading: boolean

  getListAction: (onSuccessCallback?: (data: any) => void) => void
  getAction: (id: number, onSuccessCallback?: (data: any) => void) => void
}

const useAllianceStore = create<IAllianceState>()((set, get) => ({
  loading: false,

  getListAction: async (onSuccessCallback) => {
    try {
      set({ loading: true })

      const response = await apiAllianceGetList()

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
    } finally {
      set({ loading: false })
    }
  },

  getAction: async (id, onSuccessCallback) => {
    // const { error } = useSnackStore.getState()

    try {
      set({ loading: true })

      const response = await apiAllianceGet(id)

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
    } finally {
      set({ loading: false })
    }
  }
}))

export default useAllianceStore
