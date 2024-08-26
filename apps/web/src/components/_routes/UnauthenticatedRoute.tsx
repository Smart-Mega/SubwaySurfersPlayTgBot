import useAdminAuthStore from "@/stores/useAdminAuthStore"
import React from "react"

import { Navigate, useLocation } from "react-router-dom"

export default function UnauthenticatedRoute({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const authStore = useAdminAuthStore()
  const location = useLocation()

  if (authStore.admin?.uuid) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />
  }

  return children
}
