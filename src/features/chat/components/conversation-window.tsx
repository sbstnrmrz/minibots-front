import { MessageInput } from "./message-input"
import { useMessages } from "../hooks/useMessages"
import { MessageBubble } from "./message-bubble"

export const ConversationWindow = () => {
  const { messages, addUserMessage } = useMessages()

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
      </div>
      <MessageInput onSend={addUserMessage}/>
    </div>
  )
}
