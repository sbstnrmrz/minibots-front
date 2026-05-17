import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { TooltipProvider } from '@/components/ui/tooltip'

const RootLayout = () => (
  <TooltipProvider>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{' '}
      <Link to="/chat" className="[&.active]:font-bold">
        Chat
      </Link>{' '}
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools position='top-left'/>
  </TooltipProvider>
)

export const Route = createRootRoute({ component: RootLayout })
