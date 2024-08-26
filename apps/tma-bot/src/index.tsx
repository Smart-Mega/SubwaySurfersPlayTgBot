import React from "react"

import { createRoot } from "react-dom/client"

// Uncomment this import in case, you would like to develop the application even outside the Telegram application, just in your browser.
// import "./mockEnv.ts"
import { Root } from "./root.tsx"

import "@telegram-apps/telegram-ui/dist/styles.css"
import "./root.css"

try {
  const rootElement = document.getElementById("root")
  if (rootElement) {
    createRoot(rootElement).render(
      <React.StrictMode>
        <Root />
      </React.StrictMode>
    )
  } else {
    throw new Error("could not find root element.")
  }
} catch (e) {
  console.error(`error occurred: `, e)
}
