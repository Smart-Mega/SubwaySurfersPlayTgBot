import { toast } from "sonner"
import { create } from "zustand"

import {
  apiAdminLogin,
  apiAdminLogout,
  apiAdminRefreshToken,
  apiAdminUpdateProfile
} from "@/api/adminAuthApi"

import { CLIENT_MSG } from "@repo/i18n"

interface IAdminAuthState {
  loading: boolean
  initialized: boolean
  admin: Record<string, any> | null

  loginAction: (data: any, onSuccessCallback?: () => void) => void
  logoutAction: (onSuccessCallback?: () => void) => void
  refreshTokenAction: (onSuccessCallback?: () => void) => void

  updateProfileAction: (data: any) => void
}

const useAdminAuthStore = create<IAdminAuthState>()((set, get) => ({
  initialized: false,
  loading: false,
  admin: null,

  loginAction: async (data: any, onSuccessCallback) => {
    try {
      set({ loading: true })

      const response = await apiAdminLogin(data)

      if (response?.data) {
        const { data } = response.data

        set({ admin: data })

        if (typeof onSuccessCallback === "function") {
          onSuccessCallback()
        }
      }
    } catch (err: any) {
      console.error(err)

      set({ admin: null })

      if (err?.response?.data?.message) {
        toast.error(err.response.data.message)
      } else {
        toast.error(CLIENT_MSG.SOMETHING_WENT_WRONG)
      }
    } finally {
      set({ loading: false })
    }
  },

  logoutAction: async (onSuccessCallback) => {
    try {
      set({ loading: true })
      await apiAdminLogout()

      set({ admin: null })

      if (typeof onSuccessCallback === "function") {
        onSuccessCallback()
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

  refreshTokenAction: async (onSuccessCallback) => {
    try {
      set({ loading: true })
      set({ initialized: false })

      set({ admin: null })

      const response = await apiAdminRefreshToken()

      if (response?.data) {
        const { data } = response.data

        set({ admin: data })

        if (typeof onSuccessCallback === "function") {
          onSuccessCallback()
        }
      }
    } catch (err: any) {
      console.error(err)
    } finally {
      set({ loading: false })
      set({ initialized: true })
    }
  },

  updateProfileAction: async (data) => {
    try {
      set({ loading: true })

      const response = await apiAdminUpdateProfile(data)

      if (response?.data) {
        const { data, message } = response.data

        set({ admin: data })

        toast.success(message)
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

export default useAdminAuthStore
