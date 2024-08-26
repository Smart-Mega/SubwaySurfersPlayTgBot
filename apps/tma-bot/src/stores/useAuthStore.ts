import { toast } from "sonner"
import { create } from "zustand"

import { apiAuthJoinAlliance, apiAuthLeaveAlliance, apiAuthRefresh } from "@/apis/authApi"

import { CLIENT_MSG } from "@repo/i18n"

interface IAuthState {
  loading: boolean
  initialized: boolean

  baseScore: number // score fetch from database
  hourlyRewardPoint: number // hourly reward point
  user: Record<string, any> | null

  // setRobotItem: (robot_id: number, robotItems: any) => void
  refreshRobotsAndItems: (data: Record<string, any>) => void

  refreshAction: (onSuccessCallback?: () => void, onFailureCallback?: () => void) => Promise<any>
  joinAllianceAction: (param: any) => Promise<any>
  leaveAllianceAction: (onSuccessCallback?: () => void, onFailureCallback?: () => void) => Promise<any>
  refreshAuth: () => Promise<any>
  setBaseScore: (newScore: number) => void
  increaseHourlyRewardPoint: (step: number) => void
}

const useAuthStore = create<IAuthState>()((set, get) => ({
  loading: false,
  initialized: false,

  baseScore: 0,
  hourlyRewardPoint: 0,
  user: null,

  refreshRobotsAndItems: (data) => {
    const { robotsData, itemsData } = data
    let user = get().user
    set({ user: { ...user, robots: robotsData, items: itemsData } })
  },
  // setRobotItem: (robot_id: number, robotItems: any) => {
  //   let user = get().user
  //   const robots = user?.robots

  //   if (robots) {
  //     let selectedRobot = robots.filter((robot: any) => robot.id === robot_id)?.[0]

  //     if (selectedRobot) {
  //       selectedRobot = { ...selectedRobot, items: robotItems }
  //       let unselectedRobots = robots.filter((robot: any) => robot.id !== robot_id)
  //       user = { ...user, robots: [...unselectedRobots, selectedRobot] }
  //       set({ user })
  //     }
  //   }
  // },

  refreshAction: async (onSuccessCallback, onFailureCallback) => {
    try {
      set({ loading: true })
      set({ initialized: false })

      set({ user: null })

      const response = await apiAuthRefresh()

      if (response?.data) {
        const { data } = response.data

        set({ user: data })

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
  },

  joinAllianceAction: async (param) => {
    try {
      set({ loading: true })
      const response = await apiAuthJoinAlliance(param)

      if (response?.data) {
        const { data } = response.data
        set({ user: data })
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

  leaveAllianceAction: async (onSuccessCallback, onFailureCallback) => {
    try {
      set({ loading: true })
      const response = await apiAuthLeaveAlliance()
      console.log(response)
      if (response?.data) {
        const { data } = response.data
        set({ user: data })
      }

      if (onSuccessCallback) onSuccessCallback()
    } catch (err: any) {
      console.error(err)

      if (err?.response?.data?.message) {
        toast.error(err.response.data.message)
      } else {
        toast.error(CLIENT_MSG.SOMETHING_WENT_WRONG)
      }
      
      if (onFailureCallback) onFailureCallback()
    } finally {
      set({ loading: false })
    }
  },

  refreshAuth: async () => {
    try {
      const response = await apiAuthRefresh()

      if (response?.data) {
        const { data } = response.data

        set({ user: data })
      }
    } catch (err: any) {
      console.error(err)
    }
  },

  setBaseScore: (newScore: number) => {
    set({ baseScore: newScore })
  },

  increaseHourlyRewardPoint: (step: number) => {
    const newValue = get().hourlyRewardPoint + step
    set({ hourlyRewardPoint:  newValue})
  }
}))

export default useAuthStore
