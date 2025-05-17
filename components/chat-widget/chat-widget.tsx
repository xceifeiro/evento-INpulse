"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatContent } from "./chat-content"
import { cn } from "@/lib/utils"

/* ===================================
 * COMPONENTE PRINCIPAL DO WIDGET DE CHAT
 * ===================================
 * Responsável por renderizar o botão flutuante e o container do chat
 */
export function ChatWidget() {
  // Estado para controlar se o chat está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false)

  // Estado para garantir que o componente só seja renderizado no cliente
  const [isMounted, setIsMounted] = useState(false)

  /* ===================================
   * VERIFICAÇÃO DE CHAT SALVO
   * ===================================
   */
  // Verificar se há uma conversa salva no localStorage
  const hasSavedChat = () => {
    if (typeof window === "undefined") return false
    return localStorage.getItem("autonex_chat_messages") !== null
  }

  /* ===================================
   * FUNÇÃO PARA LIMPAR O CHAT
   * ===================================
   * Reinicia a conversa removendo dados do localStorage
   */
  const clearChat = () => {
    if (typeof window === "undefined") return

    // Limpar todos os dados do chat no localStorage
    localStorage.removeItem("autonex_chat_messages")
    localStorage.removeItem("autonex_conversation_id")

    // Manter apenas o userId
    const userId = localStorage.getItem("autonex_user_id")
    const sessionData = localStorage.getItem("autonex_chat_session")

    if (sessionData) {
      try {
        const session = JSON.parse(sessionData)
        localStorage.setItem(
          "autonex_chat_session",
          JSON.stringify({
            userId: session.userId,
            sessionId: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
          }),
        )
      } catch (error) {
        console.error("Erro ao processar sessão:", error)
      }
    }

    // Forçar recarregamento do componente
    window.location.reload()
  }

  /* ===================================
   * EFEITO DE MONTAGEM DO COMPONENTE
   * ===================================
   */
  // Garantir que o componente só seja renderizado no cliente
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col items-end">
      {/* === CONTAINER DO CHAT === */}
      <div
        className={cn(
          "bg-slate-100 rounded-xl shadow-xl transition-all duration-300 ease-in-out transform mb-2 mr-4 overflow-hidden",
          isOpen
            ? "opacity-100 translate-y-0 h-[500px] max-h-[80vh] w-[350px] sm:w-[380px]"
            : "opacity-0 translate-y-[120%] h-0 w-0",
        )}
        style={{
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
        }}
      >
        {isOpen && (
          <>
            <ChatContent onClose={() => setIsOpen(false)} />

            {/* === BOTÃO PARA LIMPAR O CHAT === */}
            {hasSavedChat() && (
              <Button
                onClick={clearChat}
                variant="ghost"
                size="sm"
                className="absolute top-3 right-12 z-20 text-white/70 hover:text-white hover:bg-white/10"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                <span className="text-xs">Reiniciar</span>
              </Button>
            )}
          </>
        )}
      </div>

      {/* === BOTÃO FLUTUANTE DO CHAT === */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "rounded-full w-14 h-14 p-0 shadow-lg transition-all duration-300 flex items-center justify-center mr-6 mb-6",
          isOpen
            ? "bg-gradient-to-r from-[#821423] to-[#6a1019] hover:from-red-800 hover:to-rose-900"
            : "bg-gradient-to-r from-[#821423] to-[#6a1019] hover:from-red-800 hover:to-rose-900",
        )}
        style={{
          boxShadow: isOpen ? "0 10px 15px -3px rgba(239, 68, 68, 0.3)" : "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
        }}
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
      </Button>
    </div>
  )
}
