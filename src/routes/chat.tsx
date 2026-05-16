import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SocketProvider } from '../features/socket/SocketProvider'

const ChatLayout = () => (
  <SocketProvider>
    <Outlet />
  </SocketProvider>
)

export const Route = createFileRoute('/chat')({ component: ChatLayout })
