import { toast } from "sonner"
import { create } from "zustand"

import { apiLeaderboardGet } from "@/apis/leaderboardApi"

import { CLIENT_MSG } from "@repo/i18n"

interface ILeaderboardState {
  loading: boolean

  getAction: (onSuccessCallback?: (data: any) => void) => void
}

const useLeaderboardStore = create<ILeaderboardState>()((set, get) => ({
  loading: false,

  getAction: async (onSuccessCallback) => {
    try {
      set({ loading: true })

      const response = await apiLeaderboardGet()

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

export default useLeaderboardStore
