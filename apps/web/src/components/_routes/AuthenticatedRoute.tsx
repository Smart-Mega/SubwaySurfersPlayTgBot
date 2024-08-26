import React from "react"

import { Navigate, useLocation } from "react-router-dom"

import useAdminAuthStore from "@/stores/useAdminAuthStore"

export default function AuthenticatedRoute({ children }: Readonly<{ children: React.ReactNode }>) {
  const authStore = useAdminAuthStore()
  const location = useLocation()

  if (!authStore.admin?.uuid) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
