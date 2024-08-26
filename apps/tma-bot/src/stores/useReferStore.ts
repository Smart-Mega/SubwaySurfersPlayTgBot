import { create } from "zustand"
import { apiReferRefresh } from "@/apis/referApi.ts"

interface IReferState {
  loading: boolean
  initialized: boolean

  refer: Record<any, any> | null

  refresh: (onSuccessCallback?: () => void, onFailureCallback?: () => void) => Promise<void>
}

const useReferStore = create<IReferState>()((set, get) => ({
  loading: false,
  initialized: false,

  refer: null,

  refresh: async (onSuccessCallback, onFailureCallback) => {
    try {
      set({ loading: true })
      set({ initialized: false })

      // set({ refer: null })

      const response = await apiReferRefresh()
      if (response?.data) {
        const { data } = response.data

        set({ refer: data })

        if (typeof onSuccessCallback === "function") {
          onSuccessCallback()
        }
      }
    } catch (err: any) {
      console.error(err)

      if (typeof onFailureCallback === "function") {
        onFailureCallback()
      }
    } finally {
      set({ loading: false })
      set({ initialized: true })
    }
  }
}))

export default useReferStore