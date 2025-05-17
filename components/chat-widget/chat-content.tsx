"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, X, AlertCircle, Loader2, Sparkles } from 'lucide-react'
import { ChatMessage } from "./chat-message"
import { TypingIndicator } from "./typing-indicator"
import type { SendStatus, Message, ChatSession } from "./chat-types"
import {
  checkForResponse,
  generateUserId,
  generateSessionId,
  generateMessageId,
  generateConversationId,
  sendConversationMessage,
  getIPBasedConversationId,
} from "./webhook-service"
import { CHAT_CONFIG } from "./config"
import { Avatar } from "@/components/ui/avatar"

/* ===================================
 * CONFIGURAÇÃO DE ARMAZENAMENTO LOCAL
 * ===================================
 * Chaves para persistência de dados entre sessões
 */
const STORAGE_KEYS = {
  MESSAGES: "autonex_chat_messages",
  CONVERSATION_ID: "autonex_conversation_id",
  SESSION: "autonex_chat_session",
}

interface ChatContentProps {
  onClose: () => void
}

export function ChatContent({ onClose }: ChatContentProps) {
  /* ===================================
   * INICIALIZAÇÃO DE ESTADOS
   * ===================================
   * Configuração dos valores padrão e estados iniciais
   */
  // Estado inicial com valores padrão
  const defaultMessages: Message[] = [
    {
      id: generateMessageId(),
      text: CHAT_CONFIG.WELCOME_MESSAGE,
      isUser: false,
      timestamp: new Date(),
    },
  ]

  /* ===================================
   * ESTADOS DO COMPONENTE
   * ===================================
   */
  // Estado de montagem do componente
  const [isMounted, setIsMounted] = useState(false)

  // Input atual do usuário
  const [currentInput, setCurrentInput] = useState("")

  // Histórico de mensagens
  const [messages, setMessages] = useState<Message[]>(defaultMessages)

  // Estado de envio de mensagens
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle")

  // Mensagem de erro, se houver
  const [errorMessage, setErrorMessage] = useState<string>("")

  // ID da conversa para rastreamento no webhook
  const [conversationId, setConversationId] = useState<string | null>(null)

  // Informações da sessão do usuário
  const [session, setSession] = useState<ChatSession>({
    userId: generateUserId(),
    sessionId: generateSessionId(),
  })

  // Timer para verificação de respostas
  const [pollingTimer, setPollingTimer] = useState<NodeJS.Timeout | null>(null)

  // Tempo de início da espera por resposta
  const [waitStartTime, setWaitStartTime] = useState<number | null>(null)

  // Estado de digitação do bot
  const [isTyping, setIsTyping] = useState(false)

  // Referências para elementos DOM
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* ===================================
   * FUNÇÕES DE PERSISTÊNCIA DE DADOS
   * ===================================
   */
  // Função para carregar dados do localStorage
  const loadFromLocalStorage = () => {
    if (typeof window === "undefined") return

    try {
      // Carregar mensagens
      const savedMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES)
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages)
        // Converter strings de data para objetos Date
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(messagesWithDates)
      }

      // Carregar ID da conversa
      const savedConversationId = localStorage.getItem(STORAGE_KEYS.CONVERSATION_ID)
      if (savedConversationId) {
        setConversationId(savedConversationId)
      }

      // Carregar sessão
      const savedSession = localStorage.getItem(STORAGE_KEYS.SESSION)
      if (savedSession) {
        setSession(JSON.parse(savedSession))
      }
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage:", error)
    }
  }

  // Função para salvar dados no localStorage
  const saveToLocalStorage = () => {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages))
      if (conversationId) {
        localStorage.setItem(STORAGE_KEYS.CONVERSATION_ID, conversationId)
      }
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session))
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage:", error)
    }
  }

  /* ===================================
   * GERENCIAMENTO DO CHAT
   * ===================================
   */
  // Função para limpar o chat e reiniciar a conversa
  const clearChat = () => {
    setMessages(defaultMessages)
    setConversationId(null)
    setSession({
      userId: session.userId, // Mantém o mesmo userId
      sessionId: generateSessionId(), // Gera um novo sessionId
    })

    // Limpar localStorage
    localStorage.removeItem(STORAGE_KEYS.MESSAGES)
    localStorage.removeItem(STORAGE_KEYS.CONVERSATION_ID)
    localStorage.setItem(
      STORAGE_KEYS.SESSION,
      JSON.stringify({
        userId: session.userId,
        sessionId: generateSessionId(),
      }),
    )
  }

  // Função para fechar o chat salvando o estado
  const handleClose = () => {
    saveToLocalStorage()
    onClose()
  }

  // Função para rolar para o final das mensagens
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  /* ===================================
   * EFEITOS DE CICLO DE VIDA
   * ===================================
   */
  // Efeito para carregar dados do localStorage na montagem do componente
  useEffect(() => {
    setIsMounted(true)
    loadFromLocalStorage()
    
    // Inicializar o ID de conversa baseado em IP se não existir
    if (!conversationId) {
      const initializeConversationId = async () => {
        try {
          const ipBasedId = await getIPBasedConversationId()
          setConversationId(ipBasedId)
          localStorage.setItem(STORAGE_KEYS.CONVERSATION_ID, ipBasedId)
          console.log("ID de conversa baseado em IP inicializado:", ipBasedId)
        } catch (error) {
          console.error("Erro ao inicializar ID baseado em IP:", error)
        }
      }
      
      initializeConversationId()
    }
  }, [])

  // Efeito para salvar dados no localStorage quando estados relevantes mudam
  useEffect(() => {
    if (isMounted) {
      saveToLocalStorage()
    }
  }, [messages, conversationId, session, isMounted])

  // Efeito para rolar para o final e focar no input quando as mensagens mudam
  useEffect(() => {
    scrollToBottom()
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [messages, isTyping])

  // Limpa o timer de polling quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (pollingTimer) {
        clearInterval(pollingTimer)
      }
    }
  }, [pollingTimer])

  /* ===================================
   * VERIFICAÇÃO DE TIMEOUT
   * ===================================
   * Verifica se o tempo de espera excedeu o limite
   */
  useEffect(() => {
    if (waitStartTime) {
      const checkTimeout = setTimeout(() => {
        const now = Date.now()
        if (now - waitStartTime > CHAT_CONFIG.MAX_WAIT_TIME) {
          // Tempo de espera excedido
          if (pollingTimer) {
            clearInterval(pollingTimer)
            setPollingTimer(null)
          }

          setIsTyping(false)
          setSendStatus("timeout")
          setMessages((prev) => [
            ...prev,
            {
              id: generateMessageId(),
              text: CHAT_CONFIG.TIMEOUT_MESSAGE,
              isUser: false,
              timestamp: new Date(),
            },
          ])
          setSendStatus("idle")
        }
      }, CHAT_CONFIG.MAX_WAIT_TIME + 1000) // Verifica um pouco depois do tempo máximo

      return () => clearTimeout(checkTimeout)
    }
  }, [waitStartTime, pollingTimer])

  // Atualiza o estado de digitação com base no status de envio
  useEffect(() => {
    setIsTyping(sendStatus === "waiting")
  }, [sendStatus])

  /* ===================================
   * COMUNICAÇÃO COM WEBHOOK
   * ===================================
   */
  // Função para iniciar o polling para verificar respostas
  const startPollingForResponse = (id: string | null) => {
    if (!id) {
      console.error("Tentativa de iniciar polling sem ID de conversa válido")
      setIsTyping(false)
      setSendStatus("error")
      return
    }
    // Define o tempo de início da espera
    setWaitStartTime(Date.now())
    setIsTyping(true)

    // Inicia o polling
    const timer = setInterval(async () => {
      const result = await checkForResponse(id)

      if (result.found && result.response) {
        // Resposta encontrada
        clearInterval(timer)
        setPollingTimer(null)
        setIsTyping(false)

        // Adiciona a resposta ao chat
        setMessages((prev) => [
          ...prev,
          {
            id: generateMessageId(),
            text: result.response!,
            isUser: false,
            timestamp: new Date(),
          },
        ])

        setSendStatus("success")
        setSendStatus("idle")
      }
    }, CHAT_CONFIG.POLLING_INTERVAL)

    setPollingTimer(timer)
  }

  // Função para enviar mensagem
  const handleSendConversationMessage = async () => {
    if (!currentInput.trim() || sendStatus !== "idle") return

    // Garantir que temos um ID de conversa baseado em IP
    let currentConversationId = conversationId
    if (!currentConversationId) {
      try {
        currentConversationId = await getIPBasedConversationId()
        setConversationId(currentConversationId)
        console.log("Novo ID de conversa baseado em IP gerado:", currentConversationId)
      } catch (error) {
        console.error("Erro ao gerar ID baseado em IP:", error)
        // Fallback para o método tradicional
        currentConversationId = generateConversationId()
        setConversationId(currentConversationId)
      }
    }

    // Adiciona a mensagem do usuário ao chat
    const newMessage: Message = {
      id: generateMessageId(),
      text: currentInput,
      isUser: true,
      timestamp: new Date(),
      status: "sent",
    }

    setMessages((prev) => [...prev, newMessage])
    setCurrentInput("")

    // Simula a entrega da mensagem após 1 segundo
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)))

      // Simula a leitura da mensagem após mais 1 segundo
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "read" } : msg)))
      }, 1000)
    }, 1000)

    // Atualiza o estado para mostrar que está enviando
    setSendStatus("sending")

    // Ativa o indicador de digitação
    setIsTyping(true)

    try {
      // Sempre enviar para o webhook com o ID de conversa baseado em IP
      console.log("Enviando mensagem com ID de conversa baseado em IP:", currentConversationId)
      
      const result = await sendConversationMessage(
        currentInput,
        currentConversationId,
        session.userId,
        session.sessionId,
        messages,
      )

      if (result.success) {
        // Muda para o estado de aguardando resposta
        setSendStatus("waiting")

        // Inicia o polling para verificar respostas
        startPollingForResponse(currentConversationId)
      } else {
        setIsTyping(false)
        setSendStatus("error")
        setErrorMessage(result.message)
        setMessages((prev) => [
          ...prev,
          {
            id: generateMessageId(),
            text: `Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?`,
            isUser: false,
            timestamp: new Date(),
          },
        ])
        setSendStatus("idle")
      }
    } catch (error) {
      setIsTyping(false)
      setSendStatus("error")
      const message = error instanceof Error ? error.message : "Erro desconhecido"
      setErrorMessage(message)
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          text: `Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?`,
          isUser: false,
          timestamp: new Date(),
        },
      ])
      setSendStatus("idle")
    }
  }

  /* ===================================
   * MANIPULAÇÃO DE EVENTOS DO USUÁRIO
   * ===================================
   */
  // Função principal para lidar com o envio de mensagens
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentInput.trim()) return
    await handleSendConversationMessage()
  }

  // Função para lidar com teclas pressionadas (Enter para enviar)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  /* ===================================
   * HELPERS DE UI
   * ===================================
   */
  // Determina se o campo de entrada deve estar desativado
  const isInputDisabled = sendStatus === "sending" || sendStatus === "waiting"

  // Determina o placeholder do campo de entrada
  const getInputPlaceholder = () => {
    if (sendStatus === "sending") {
      return "Enviando..."
    }

    if (sendStatus === "waiting") {
      return "Aguardando resposta..."
    }

    return "Digite uma mensagem..."
  }

  /* ===================================
   * RENDERIZAÇÃO DO COMPONENTE
   * ===================================
   */
  return (
    <div className="flex flex-col h-full rounded-xl shadow-lg bg-transparent backdrop:blur-sm" style={{ backgroundImage: "url('/bg-chat.png')" }}>
      {/* === CABEÇALHO DO CHAT === */}
      <div
        className="bg-gradient-to-r from-[#356969] to-[#035555] p-3 flex items-center rounded-t-xl relative overflow-hidden"
        style={{
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Efeito de brilho */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),transparent_65%)]"></div>
        </div>

        <div className="flex items-center flex-1 z-10">
          <Avatar className="h-10 w-10 mr-3 border-2 border-green-700 bg-white shadow-lg overflow-hidden">
            <img
              src="/favicon-inpulse.svg" // Substitua pelo caminho da sua imagem
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </Avatar>
          <div>
            <h2 className="text-white font-semibold">INpulse</h2>
            <p className="text-blue-100 text-xs flex items-center">
              {sendStatus === "waiting" ? (
                <>
                  <span className="inline-block h-2 w-2 rounded-full bg-blue-300 mr-1.5 animate-pulse"></span>
                  digitando...
                </>
              ) : (
                <>
                  <span className="inline-block h-2 w-2 rounded-full bg-green-300 mr-1.5"></span>
                  online
                </>
              )}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="text-white hover:bg-white/10 h-8 w-8 rounded-full z-10 transition-all duration-200"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Fechar</span>
        </Button>
      </div>

      {/* === ÁREA DE MENSAGENS === */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
        style={{
          backgroundColor: "rgba(4, 70, 71, 0.1)",
        }}
      >
        {/* Renderização das mensagens */}
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
            status={message.status}
          />
        ))}

        {/* === INDICADOR DE DIGITAÇÃO === */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-3 py-2 relative shadow-sm bg-white/90 backdrop-blur-sm text-gray-800 rounded-bl-none border border-blue-100">
              <TypingIndicator />
              <div className="absolute w-3 h-3 bottom-0 left-0 translate-x-[-8px] translate-y-[-8px] border-t-[8px] border-l-[8px] border-transparent border-t-white" />
            </div>
          </div>
        )}

        {/* === INDICADORES DE STATUS === */}
        {sendStatus === "timeout" && (
          <div className="flex items-center justify-center p-2 bg-slate-700/80 backdrop-blur-sm rounded-lg shadow-sm text-white">
            <AlertCircle className="h-5 w-5 mr-2 text-amber-300" />
            <span>Tempo de espera excedido. Entraremos em contato em breve.</span>
          </div>
        )}

        {sendStatus === "error" && (
          <div className="flex items-center justify-center p-2 bg-slate-700/80 backdrop-blur-sm rounded-lg shadow-sm text-white">
            <AlertCircle className="h-5 w-5 mr-2 text-red-300" />
            <span>Erro ao enviar: {errorMessage}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* === ÁREA DE INPUT === */}
      <div className="p-3 bg-[rgba(4,70,71,0.5)] backdrop-blur-sm">
        <div className="flex items-center w-full">
          <form onSubmit={handleSubmit} className="flex-1 flex">
            <div className="flex items-center w-full bg-slate-100 rounded-full mr-2 px-4 py-2 border border-slate-300 shadow-sm">
              <Input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={getInputPlaceholder()}
                className="flex-1 border-none bg-transparent focus-visible:ring-0"
                disabled={isInputDisabled}
              />
            </div>

            <div className="rounded-full p-1"><Button
              type="submit"
              size="icon"
              className={`h-auto w-auto p-4 rounded-full transition-all duration-200 ${
                !currentInput.trim() || isInputDisabled
                  ? "bg-slate-400 hover:bg-slate-500"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              }`}
              disabled={!currentInput.trim() || isInputDisabled}
            >
              {sendStatus === "sending" || sendStatus === "waiting" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              <span className="sr-only">Enviar</span>
            </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
