import { ConversationWindow } from '@/features/chat/components/conversation-window'
import { createFileRoute } from '@tanstack/react-router'

const ChatPage = () => {
  return <ConversationWindow/>
}

export const Route = createFileRoute('/chat/')({ component: ChatPage })
