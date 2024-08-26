import React, { useEffect, useRef } from "react"

import LoadingOverlay from "./components/LoadingOverlay"
import useAdminAuthStore from "@/stores/useAdminAuthStore"

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  const initialized = useRef(false)
  const authStore = useAdminAuthStore()

  const refreshToken = () => {
    authStore.refreshTokenAction()
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      refreshToken()
    }
  }, [])

  if (!authStore.initialized) {
    return <LoadingOverlay loading />
  }

  return children
}
