import { Avatar } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { useTheme } from "@/hooks/useTheme"
import { MoreHorizontalIcon, MoonIcon, SunIcon, UserIcon } from "lucide-react"

interface Props {
  name: string
  email: string
}

export function UserDropdown({ name, email }: Props) {
  const { theme, toggleTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size="lg" className="cursor-pointer w-full">
          <Avatar className="flex justify-center items-center bg-secondary">
            <UserIcon className="size-4" />
          </Avatar>
          <div className="flex flex-col text-left leading-tight flex-1">
            <span className="text-sm font-medium">{name}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
          <MoreHorizontalIcon className="size-4 shrink-0" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-56">
        <DropdownMenuItem onClick={toggleTheme}>
          {theme === "dark"
            ? <><SunIcon className="size-4" /> Light mode</>
            : <><MoonIcon className="size-4" /> Dark mode</>
          }
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
