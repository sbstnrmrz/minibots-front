import { MessageInput } from "./message-input"
import { useMessages } from "../hooks/useMessages"
import { MessageBubble } from "./message-bubble"

export const ConversationWindow = () => {
  const { messages, addUserMessage } = useMessages()

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex flex-col flex-1 min-h-0 gap-4 overflow-y-auto px-4 pt-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
      </div>
      <div className="px-4 py-4">
        <MessageInput onSend={addUserMessage}/>
      </div>
    </div>
  )
}
