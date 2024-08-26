import React from "react"

import { Navigate, useLocation } from "react-router-dom"

import useAuthStore from "@/stores/useAuthStore"

interface Props {
  roles: string[]
  children: React.ReactNode
}

export default function RoleBasedRoute({ roles, children }: Readonly<Props>) {
  const authStore = useAuthStore()
  const location = useLocation()

  if (authStore.user && roles.indexOf(authStore.user.role) === -1) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />
  }

  return children
}
