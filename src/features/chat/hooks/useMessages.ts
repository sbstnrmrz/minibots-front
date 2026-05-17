import { useEffect, useState } from "react"
import { useSocket } from "@/features/socket/hooks/useSocket"
import { useChatSession } from "@/features/chat/ChatSessionProvider"

export interface Message {
  content: string
  role: "user" | "agent"
}

export function useMessages() {
  const { socket } = useSocket()
  const { chatId } = useChatSession()
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    setMessages([])
  }, [chatId])

  useEffect(() => {
    function onNewMessage(message: Message) {
      if (message.role === "user") return
      setMessages((prev) => [...prev, message])
    }

    socket.on("new_message", onNewMessage)
    return () => { socket.off("new_message", onNewMessage) }
  }, [socket])

  function addUserMessage(content: string) {
    setMessages((prev) => [...prev, { content, role: "user" }])
  }

  return { messages, addUserMessage }
}
