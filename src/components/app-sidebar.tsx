import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { UserDropdown } from "@/components/user-dropdown"
import { Button } from "./ui/button"
import { PlusIcon } from "lucide-react"
import { useChatSession } from "@/features/chat/ChatSessionProvider"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { bots, selectedBotId, setSelectedBotId } = useChatSession()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="text-2xl font-bold">
          Minibots
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <Button className="flex justify-center">
          <PlusIcon/>
          Crear Agente
        </Button>
        <SidebarGroup>
          <SidebarGroupLabel>Agentes</SidebarGroupLabel>
          <SidebarMenu>
            {bots.map((bot) => (
              <SidebarMenuItem key={bot.id}>
                <SidebarMenuButton
                  isActive={bot.id === selectedBotId}
                  onClick={() => setSelectedBotId(bot.id)}
                >
                  {bot.name}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserDropdown name="Sebastián" email="ramicastasebas@gmail.com" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
