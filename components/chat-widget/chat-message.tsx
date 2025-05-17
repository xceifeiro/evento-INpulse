import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Check, CheckCheck } from "lucide-react"

/* ===================================
 * COMPONENTE DE MENSAGEM DO CHAT
 * ===================================
 * Renderiza uma única mensagem de chat com estilo diferente
 * dependendo se é do usuário ou do assistente
 */
interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp?: Date
  status?: "sent" | "delivered" | "read"
}

export function ChatMessage({ message, isUser, timestamp = new Date(), status = "read" }: ChatMessageProps) {
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-3 py-2 relative shadow-sm transition-all duration-200",
          isUser
            ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-none"
            : "bg-white/90 backdrop-blur-sm text-gray-800 rounded-bl-none border border-blue-100",
        )}
        style={{
          boxShadow: isUser ? "0 2px 8px rgba(59, 130, 246, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Conteúdo da mensagem */}
        {message}

        {/* Timestamp e indicadores de status */}
        <div className="text-xs mt-1 flex items-center justify-end space-x-1">
          <span className={isUser ? "text-blue-100" : "text-gray-500"}>
            {format(timestamp, "HH:mm", { locale: ptBR })}
          </span>

          {/* Indicadores de status (apenas para mensagens do usuário) */}
          {isUser && (
            <span className="ml-1">
              {status === "sent" && <Check className="h-3 w-3 inline text-blue-100" />}
              {status === "delivered" && <CheckCheck className="h-3 w-3 inline text-blue-100" />}
              {status === "read" && <CheckCheck className="h-3 w-3 inline text-blue-100" />}
            </span>
          )}
        </div>

        {/* Triângulo para bolha de mensagem */}
        <div
          className={cn(
            "absolute w-3 h-3 bottom-0",
            isUser
              ? "right-0 translate-x-[8px] translate-y-[-8px] border-t-[8px] border-r-[8px] border-transparent border-t-indigo-600"
              : "left-0 translate-x-[-8px] translate-y-[-8px] border-t-[8px] border-l-[8px] border-transparent border-t-white",
          )}
        />
      </div>
    </div>
  )
}
