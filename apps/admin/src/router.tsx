import React from "react"

import { RouteObject } from "react-router-dom"

import AuthenticatedRoute from "./components/_routes/AuthenticatedRoute"

import Home from "./pages/home"

import Login from "./pages/auth/login"

import Dashboard from "./pages/dashboard"
import AccountSettings from "./pages/account-settings"

const router: RouteObject[] = [
  {
    path: "/",
    element: <Home />
  },

  /**
   * ----------------------------------------------------------------
   * Unauthenticated Routes
   * ----------------------------------------------------------------
   */
  {
    path: "login",
    element: <Login />
  },

  /**
   * ----------------------------------------------------------------
   * Authenticated Routes
   * ----------------------------------------------------------------
   */
  {
    path: "account-settings",
    element: (
      <AuthenticatedRoute>
        <AccountSettings />
      </AuthenticatedRoute>
    )
  },
  {
    path: "dashboard",
    element: (
      <AuthenticatedRoute>
        <Dashboard />
      </AuthenticatedRoute>
    )
  }
]

export default router
