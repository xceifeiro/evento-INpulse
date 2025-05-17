/* ===================================
 * TIPOS E ENUMERAÇÕES DO CHAT
 * ===================================
 * Definição dos tipos de dados utilizados no chat
 */

// Simplificar o enum ChatStep para ter apenas o modo de conversa
export enum ChatStep {
  Conversation = 0,
}

// Tipo para os estados de envio de mensagens
export type SendStatus = "idle" | "sending" | "waiting" | "success" | "error" | "timeout"

// Interface para as mensagens do chat
export interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  status?: "sent" | "delivered" | "read"
}

// Interface para os dados da sessão do chat
export interface ChatSession {
  userId: string
  sessionId: string
  conversationId?: string
}
