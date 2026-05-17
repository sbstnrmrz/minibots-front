import { MessageInput } from "./message-input"
import { useMessages } from "../hooks/useMessages"
import { MessageBubble } from "./message-bubble"

export const ConversationWindow = () => {
  const { messages, addUserMessage } = useMessages()

  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <div className="flex flex-col flex-1 gap-4 overflow-hidden">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
      </div>
      <MessageInput onSend={addUserMessage}/>
    </div>
  )
}
