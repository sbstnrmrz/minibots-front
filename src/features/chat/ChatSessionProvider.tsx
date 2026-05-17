import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000"

export interface Bot {
  id: number
  name: string
  bot_type: string
  workflow_id: number | null
  system_prompt: string | null
  spreadsheet_id: string | null
}

interface ChatSessionValue {
  bots: Bot[]
  selectedBotId: number | null
  setSelectedBotId: (id: number) => void
  chatId: string
}

const ChatSessionContext = createContext<ChatSessionValue | null>(null)

export function ChatSessionProvider({ children }: { children: ReactNode }) {
  const [bots, setBots] = useState<Bot[]>([])
  const [selectedBotId, setSelectedBotIdState] = useState<number | null>(null)
  const [chatId, setChatId] = useState<string>(() => crypto.randomUUID())

  useEffect(() => {
    let cancelled = false
    fetch(`${API_URL}/bots`)
      .then((res) => res.json())
      .then((data: Bot[]) => {
        if (cancelled) return
        setBots(data)
        if (data.length > 0) setSelectedBotIdState(data[0].id)
      })
      .catch((err) => console.error("[chat] failed to fetch bots:", err))
    return () => {
      cancelled = true
    }
  }, [])

  function setSelectedBotId(id: number) {
    if (id === selectedBotId) return
    setSelectedBotIdState(id)
    setChatId(crypto.randomUUID())
  }

  const value = useMemo<ChatSessionValue>(
    () => ({ bots, selectedBotId, setSelectedBotId, chatId }),
    [bots, selectedBotId, chatId],
  )

  return (
    <ChatSessionContext.Provider value={value}>
      {children}
    </ChatSessionContext.Provider>
  )
}

export function useChatSession(): ChatSessionValue {
  const ctx = useContext(ChatSessionContext)
  if (!ctx)
    throw new Error("useChatSession must be used inside <ChatSessionProvider>")
  return ctx
}
