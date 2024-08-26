import React, { type FC, useEffect, useMemo } from "react"

import { useIntegration } from "@tma.js/react-router-integration"
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
} from "@tma.js/sdk-react"
import { initBackButton, postEvent } from "@tma.js/sdk"
import { AppRoot } from "@telegram-apps/telegram-ui"
import { Navigate, Route, Router, Routes } from "react-router-dom"
import { Toaster } from "sonner"

import Template from "@/components/Template"
import routes from "@/navigation/routes"

import { io } from 'socket.io-client';
import { useSocket } from "./context/socket"

const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:9000"

export const App: FC = () => {
  
  let lp = {platform:''}
  try {
    lp = useLaunchParams()
  } catch(e) {}
  const miniApp = useMiniApp()
  const themeParams = useThemeParams()
  const viewport = useViewport()
  const { setSocket } = useSocket()
  
  const navigator = useMemo(() => initNavigator("app-navigation-state"), [])
  const [location, reactNavigator] = useIntegration(navigator)
  const [backButton] = initBackButton()
  
  useEffect(() => {
    postEvent("web_app_expand")

    const socketIo = io(socketUrl, { autoConnect: true });

    socketIo.on('connect', () => {
      console.log('+++++++++ socket connected +++++++++++')
      console.log(socketIo.id)
    })

    socketIo.on('connect_error', () => {
      console.log('---------- socket connection error ------------')
      setTimeout(()=>socketIo.connect(), 5000)
    })

    setSocket(socketIo)
    
  }, [])

  useEffect(() => {
    if (miniApp) {
      miniApp.setHeaderColor('#000000')
      console.log("Header color set successfully");
    }
    else console.log('Miniapp is not initialized');
    return bindMiniAppCSSVars(miniApp, themeParams)
  }, [miniApp, themeParams])

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams)
  }, [themeParams])

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport)
  }, [viewport])

  useEffect(() => {
    navigator.attach()
    return () => navigator.detach()
  }, [navigator])

  useEffect(() => {
    if (location.pathname === "/") {
      backButton.hide()
    } else {
      backButton.show()
    }
  }, [location])

  return (
    <AppRoot
      appearance="dark"
      platform={["macos", "ios"].includes(lp?.platform) ? "ios" : "base"}
      className="bg-black"
    >
      <Template>
        <Router location={location} navigator={reactNavigator}>
          <Routes>
            {routes.map((route: any) => (
              <Route key={route.path} {...route} />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </Template>

      <Toaster richColors expand position="bottom-right" />
    </AppRoot>
  )
}
