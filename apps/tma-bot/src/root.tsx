import React, { type FC, useEffect, useMemo } from "react"

import { SDKProvider, useLaunchParams } from "@tma.js/sdk-react"
import { TonConnectUIProvider } from "@tonconnect/ui-react"

import { App } from "./app"

import SocketContextProvider from "./context/socket"
import { ErrorBoundary } from "@/components/ErrorBoundary.tsx"

const ErrorBoundaryFallback: FC<{ error: unknown }> = ({ error }) => {
  const getErrorMessage = (error: any) => {
    if (!error) return "No error"

    if (error instanceof Error) {
      return error.message
    } else if (typeof error === "string") {
      return error
    } else {
      return JSON.stringify(error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">An unhandled error occurred:</h1>

      <blockquote>
        <code>{getErrorMessage(error)}</code>
      </blockquote>
    </div>
  )
}

export const Root: FC = () => {
  let ulp = {startParam:''};
  try {
    ulp = useLaunchParams() as any
  } catch(e) {}
  const debug = ulp.startParam === "debug"
  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString()
  }, [])

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init())
    }
  }, [debug])

  return (
    <ErrorBoundary fallback={ErrorBoundaryFallback}>
      <TonConnectUIProvider manifestUrl={manifestUrl} actionsConfiguration={{twaReturnUrl: 'https://t.me/megaton_probot'}}>
        <SDKProvider acceptCustomStyles debug={debug}>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </SDKProvider>
      </TonConnectUIProvider>
    </ErrorBoundary>
  )
}
