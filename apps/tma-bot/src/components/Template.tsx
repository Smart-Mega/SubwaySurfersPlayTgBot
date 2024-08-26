import React, { useEffect, useRef, useState } from "react"
import useSWR from "swr"

import { toast } from "sonner"

import useAuthStore from "@/stores/useAuthStore"
import useTaskStore from "@/stores/useTaskStore"

import Splash from "./Splash"

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  const initialized = useRef(false)
  const timer = React.useRef(0);

  const [authenticated, setAuthenticated] = useState(false)

  const increaseStep: number = 1

  useSWR('api/auth', () => authStore.refreshAuth().then(() => 'ok'), {refreshInterval: 3000})

  const authStore = useAuthStore()
  const taskStore = useTaskStore()

  const refresh = () => {
    setTimeout(async () => {
      await authStore.refreshAction(
        () => {
          setAuthenticated(true)
        },
        () => {
          setAuthenticated(false)
          toast.error("Failed to get user credentials.")

          setTimeout(() => {
            refresh()
          }, 10000)
        }
      )
    }, 1000)
  }

  useEffect(() => {
    clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      authStore.increaseHourlyRewardPoint(increaseStep)
    }, 1000);
  }, []);


  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      refresh()
    }
  }, [])

  useEffect(() => {
    if (authStore.user?.score) {
      authStore.setBaseScore(Number(authStore.user?.score))
    }
  }, [authStore.user?.score])

  if (!authStore.initialized) {
    return <Splash />
  }

  if (!authenticated) {
    return <Splash />
  }

  return children
}
