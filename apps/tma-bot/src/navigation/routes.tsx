import React from "react"

import { RouteObject } from "react-router-dom"

import Home from "@/pages/home"
import Store from "@/pages/store"
import Tasks from "@/pages/tasks"
import Profile from "@/pages/profile"
import Tournament from "@/pages/tournament"
import TonConnect from "@/pages/tonconnect"

import Leaderboard from "@/pages/leaderboard"

import AllianceList from "@/pages/alliance/list"
// import AllianceCreate from "@/pages/alliance/create"
import AllianceView from "@/pages/alliance/view"
import AllianceDistribute from "@/pages/alliance/distribute"
import AllianceArena from "@/pages/alliance/arena"
import AllianceMegagun from "@/pages/alliance/megagun"

const router: RouteObject[] = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "store",
    element: <Store />
  },
  {
    path: "tasks",
    element: <Tasks />
  },
  {
    path: "profile",
    element: <Profile />
  },
  {
    path: "tournament",
    element: <Tournament />
  },
  {
    path: "tonconnect",
    element: <TonConnect />
  },
  {
    path: "leaderboard",
    element: <Leaderboard />
  },
  {
    path: "alliance/list",
    element: <AllianceList />
  },
  // {
  //   path: "alliance/create",
  //   element: <AllianceCreate />
  // },
  {
    path: "alliance/view/:id",
    element: <AllianceView />
  },
  {
    path: "alliance/distribute/:id",
    element: <AllianceDistribute />
  },
  {
    path: "alliance/arena/:id",
    element: <AllianceArena />
  },
  {
    path: "alliance/megagun/:id",
    element: <AllianceMegagun />
  }
]

export default router
