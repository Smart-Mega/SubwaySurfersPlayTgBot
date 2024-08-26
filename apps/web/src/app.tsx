import React from "react"

import { RouterProvider, createBrowserRouter } from "react-router-dom"

import Template from "@/components/_layout/Template"
import { ThemeProvider } from "@/components/ThemeProvider"
import router from "@/router"

import { Toaster } from "@repo/ui/components/ui/sonner"

export default function App() {
  return (
    <Template>
      <ThemeProvider defaultTheme="light" storageKey="mta-theme">
        <RouterProvider router={createBrowserRouter(router)} />
        <Toaster richColors position="bottom-right" />
      </ThemeProvider>
    </Template>
  )
}
