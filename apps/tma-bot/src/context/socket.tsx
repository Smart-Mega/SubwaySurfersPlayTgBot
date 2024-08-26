
import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
// import {io} from 'socket.io-client'

// const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:9000"

// const socket = io(socketUrl, { autoConnect: true });

type SocketContextType = {
  socket: any,
  setSocket: (socket: any) => void
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  setSocket: () => { }
})

function SocketContextProvider({ children }: { children: ReactNode }) {

  const [socket, setSocket] = useState<any>()

  const value = useMemo(() => ({socket, setSocket}), [socket])

  return (
    <SocketContext.Provider value={value} >
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider

export const useSocket = () => {
  return useContext(SocketContext)
}