import { createFileRoute } from '@tanstack/react-router'

const ChatPage = () => {
  return <div>Chat</div>
}

export const Route = createFileRoute('/chat/')({ component: ChatPage })
