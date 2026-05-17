import { useEffect, useState } from "react"
import { useSocket } from "@/features/socket/hooks/useSocket"

export interface Message {
  content: string
  role: "user" | "agent"
}

export function useMessages() {
  const { socket } = useSocket()
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    function onNewMessage(message: Message) {
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
