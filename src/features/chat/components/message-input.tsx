import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendIcon } from "lucide-react"
import { useSocket } from "@/features/socket/hooks/useSocket"

interface Props {
  onSend: (content: string) => void
}

export const MessageInput = ({ onSend }: Props) => {
  const { socket } = useSocket()
  const [content, setContent] = useState("")

  const sendMessage = () => {
    if (!content.trim()) return
    socket.emit("send_message", { content })
    console.log('[socket] Sending message: ' + content)
    onSend(content)
    setContent("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage()
  }

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Escribe un mensaje"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={sendMessage} className="flex items-center justify-center">
        <SendIcon/>
      </Button>
    </div>
  )
}
