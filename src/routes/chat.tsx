import React from 'react'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SocketProvider } from '../features/socket/SocketProvider'
import { ChatSessionProvider } from '../features/chat/ChatSessionProvider'

const ChatLayout = () => (
  <SocketProvider>
    <ChatSessionProvider>
      <SidebarProvider className="h-svh overflow-hidden" style={{ '--sidebar-width': '19rem' } as React.CSSProperties}>
        <AppSidebar />
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </ChatSessionProvider>
  </SocketProvider>
)

export const Route = createFileRoute('/chat')({ component: ChatLayout })
