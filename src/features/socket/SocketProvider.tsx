import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Socket } from 'socket.io-client'
import { getSocket } from './socket'

interface SocketContextValue {
  socket: Socket
  isConnected: boolean
}

const SocketContext = createContext<SocketContextValue | null>(null)

export function SocketProvider({ children }: { children: ReactNode }) {
  const socket = getSocket()
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    socket.connect()

    function onConnect() {
      console.debug('✅ [socket] connected:', socket.id)
      setIsConnected(true)
    }
    function onDisconnect(reason: string) {
      console.debug('❌ [socket] disconnected:', reason)
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [socket])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocketContext(): SocketContextValue {
  const ctx = useContext(SocketContext)
  if (!ctx) throw new Error('useSocketContext must be used inside <SocketProvider>')
  return ctx
}
