// Serviço para enviar dados para webhook e receber respostas
import { CHAT_CONFIG } from "./config"
import { v4 as uuidv4 } from "uuid"
import type { Message } from "./chat-types"

/* ===================================
 * TIPOS DE DADOS
 * ===================================
 * Definição das interfaces para comunicação com webhook
 */
export interface ConversationData {
  message: string
  timestamp: string
  conversationId: string
  userId: string
  sessionId: string
  messageHistory: {
    role: "user" | "assistant"
    content: string
    timestamp: string
  }[]
}

export type WebhookResponse = {
  success: boolean
  message: string
  conversationId?: string
}

/* ===================================
 * FUNÇÕES DE GERAÇÃO DE ID BASEADO EM IP
 * ===================================
 * Funções para criar identificadores baseados no IP do usuário
 */

// Função para obter o IP do usuário
async function getUserIP(): Promise<string> {
  try {
    // Usando um serviço externo para obter o IP (funciona no lado do cliente)
    const response = await fetch("https://api.ipify.org/?format=json")
    const data = await response.json()
    return data.ip
  } catch (error) {
    console.error("Erro ao obter IP do usuário:", error)
    // Retorna um valor padrão em caso de erro
    return "unknown-ip"
  }
}

// Função para criar um hash a partir de uma string
async function createHash(text: string): Promise<string> {
  // Verifica se a API Web Crypto está disponível
  if (typeof crypto !== "undefined" && crypto.subtle) {
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(text)
      const hashBuffer = await crypto.subtle.digest("SHA-256", data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
        .substring(0, 36)
    } catch (e) {
      console.error("Erro ao criar hash:", e)
    }
  }

  // Fallback simples se crypto não estiver disponível
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Converte para um inteiro de 32 bits
  }
  return Math.abs(hash).toString(16).padStart(8, "0") + "-" + Date.now().toString(16)
}

// Função para gerar um ID de conversa baseado no IP
export async function getIPBasedConversationId(): Promise<string> {
  // Verificar se já existe um ID de conversa baseado em IP no localStorage
  const ipBasedIdKey = "inpulse_ip_based_conversation_id"
  const existingId = localStorage.getItem(ipBasedIdKey)

  if (existingId) {
    console.log("Usando ID de conversa existente baseado em IP:", existingId)
    return existingId
  }

  try {
    // Obter o IP do usuário
    const ip = await getUserIP()

    // Adicionar um salt e outros identificadores para aumentar a unicidade
    const userAgent = navigator.userAgent || ""
    const screenSize = `${window.screen.width}x${window.screen.height}`
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
    const language = navigator.language || ""

    // Criar uma string única combinando todos esses fatores
    const uniqueString = `${ip}-${userAgent}-${screenSize}-${timeZone}-${language}-inpulse-salt`

    // Gerar um hash dessa string
    const ipBasedId = await createHash(uniqueString)

    // Salvar no localStorage para uso futuro
    localStorage.setItem(ipBasedIdKey, ipBasedId)

    console.log("Novo ID de conversa baseado em IP gerado:", ipBasedId)
    return ipBasedId
  } catch (error) {
    console.error("Erro ao gerar ID baseado em IP:", error)
    // Fallback para o método original em caso de erro
    const fallbackId = uuidv4()
    console.log("Usando ID de fallback:", fallbackId)
    return fallbackId
  }
}

/* ===================================
 * FUNÇÕES DE GERAÇÃO DE IDs
 * ===================================
 * Funções para criar identificadores únicos
 */
// Função para gerar um ID único para a conversa
export function generateConversationId(): string {
  return uuidv4()
}

// Função para gerar um ID único para o usuário
export function generateUserId(): string {
  // Verifica se já existe um userId no localStorage
  const existingUserId = localStorage.getItem("inpulse_user_id")
  if (existingUserId) {
    return existingUserId
  }

  // Se não existir, cria um novo e salva
  const newUserId = uuidv4()
  try {
    localStorage.setItem("inpulse_user_id", newUserId)
  } catch (error) {
    console.error("Erro ao salvar userId no localStorage:", error)
  }

  return newUserId
}

// Função para gerar um ID único para a sessão
export function generateSessionId(): string {
  return uuidv4()
}

// Função para gerar um ID único para mensagem
export function generateMessageId(): string {
  return uuidv4()
}

/* ===================================
 * FUNÇÕES DE COMUNICAÇÃO COM WEBHOOK
 * ===================================
 */
// Função para enviar mensagem na conversa
export async function sendConversationMessage(
  message: string,
  conversationId: string | null,
  userId: string,
  sessionId: string,
  messageHistory: Message[],
): Promise<WebhookResponse> {
  try {
    // Se não temos conversationId, geramos um novo baseado no IP
    const actualConversationId = conversationId || (await getIPBasedConversationId())

    // Prepara o histórico de mensagens em formato adequado para o webhook
    const formattedHistory = messageHistory.map((msg) => ({
      role: msg.isUser ? "user" : ("assistant" as "user" | "assistant"),
      content: msg.text,
      timestamp: msg.timestamp.toISOString(),
    }))

    // Prepara os dados para enviar
    const data: ConversationData = {
      message,
      timestamp: new Date().toISOString(),
      conversationId: actualConversationId,
      userId,
      sessionId,
      messageHistory: formattedHistory,
    }

    console.log("Enviando mensagem para webhook:", data)

    const response = await fetch(CHAT_CONFIG.CONVERSATION_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Erro ao enviar mensagem: ${response.status}`)
    }

    await response.json()

    return {
      success: true,
      message: "Mensagem enviada com sucesso!",
      conversationId: actualConversationId,
    }
  } catch (error) {
    console.error("Erro ao enviar mensagem para webhook:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido ao enviar mensagem",
      conversationId: conversationId || undefined,
    }
  }
}

// Função para verificar se há uma resposta disponível
export async function checkForResponse(conversationId: string | null): Promise<{ found: boolean; response?: string }> {
  if (!conversationId) {
    console.error("Tentativa de verificar resposta sem ID de conversa válido")
    return { found: false }
  }

  try {
    console.log("Verificando resposta para ID:", conversationId)

    const response = await fetch(`${CHAT_CONFIG.RESPONSE_WEBHOOK_URL}?conversationId=${conversationId}`)
    const data = await response.json()

    if (response.ok && data.found) {
      console.log("Resposta encontrada:", data.response)
      return {
        found: true,
        response: data.response,
      }
    }

    return {
      found: false,
    }
  } catch (error) {
    console.error("Erro ao verificar resposta:", error)
    return {
      found: false,
    }
  }
}
