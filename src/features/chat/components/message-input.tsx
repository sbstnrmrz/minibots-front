import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendIcon } from "lucide-react"
import { useSocket } from "@/features/socket/hooks/useSocket"

export const MessageInput = () => {
  const { socket } = useSocket()
  const [content, setContent] = useState("")

  const sendMessage = () => {
    if (!content.trim()) return
    socket.emit("send_message", { content })
    console.log('[socket] Sending message: ' + content);
    
    setContent("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage()
  }

  return (
    <div className="px-4 flex gap-2">
      <Input
        placeholder="Escribe un mensaje"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button 
        onClick={sendMessage} className="flex items-center justify-center"
      >
        <SendIcon/>
      </Button>
    </div>
  )
}
