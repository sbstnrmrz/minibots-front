import { Avatar } from "@/components/ui/avatar"
import { BotIcon, UserIcon } from "lucide-react"

interface MessageBubbleProps {
  role: "user" | "agent";
  content: string;
}

export const MessageBubble = ({ role, content }: MessageBubbleProps) => {
  const isUser = role === "user"

  return (
    <div className={`flex gap-2 ${!isUser ? "flex-row-reverse" : "flex-row"}`}>
      <Avatar className="flex bg-secondary  justify-center items-center">
        {isUser ? <UserIcon className="p-0.5 stroke-black"/> : <BotIcon className="stroke-black"/>}
      </Avatar>
      <div 
        className={`
        rounded-xl bg-primary text-white text-sm max-w-[60%] px-2 py-1 ${isUser ? "rounded-tr-none" : "rounded-tl-none"}
        `}
      >
        {content}
      </div>
    </div>
  )
}
