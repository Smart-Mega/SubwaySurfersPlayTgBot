import React from "react"

import { createRoot } from "react-dom/client"

import "@repo/ui/globals.css"
import "@/app.css"

import App from "./app"

try {
  const rootElement = document.getElementById("root")
  if (rootElement) {
    createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  } else {
    throw new Error("could not find root element.")
  }
} catch (e) {
  console.error(`error occurred: `, e)
}
