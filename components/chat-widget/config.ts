/* ===================================
 * CONFIGURAÇÃO DO CHAT WIDGET
 * ===================================
 * Centraliza todas as configurações para facilitar alterações futuras
 */

export const CHAT_CONFIG = {
  // === CONFIGURAÇÕES DE WEBHOOK ===

  // URL do webhook para conversa (N8N)
  CONVERSATION_WEBHOOK_URL:
    "https://n8n-augustho-n8n.scyobq.easypanel.host/webhook/3ee123e8-c8c5-4de1-869b-e7ca7d6e3042",

  // URL do webhook para receber respostas (nosso site)
  RESPONSE_WEBHOOK_URL: "/api/webhook-response",

  // === CONFIGURAÇÕES DE POLLING ===

  // Intervalo de verificação para novas respostas (em ms)
  POLLING_INTERVAL: 3000, // 3 segundos

  // Tempo máximo de espera por uma resposta (em ms)
  MAX_WAIT_TIME: 60000, // 1 minuto

  // === CONFIGURAÇÕES VISUAIS ===

  // Título do chat
  CHAT_TITLE: "AutoNex AI",

  // Cores principais
  PRIMARY_COLOR: "blue-600",
  HOVER_COLOR: "blue-700",

  // === MENSAGENS PADRÃO ===

  // Mensagem inicial
  WELCOME_MESSAGE: "Olá! Sou o assistente virtual da AutoNex. Como posso ajudar você hoje?",

  // Mensagem de erro
  ERROR_MESSAGE: "Desculpe, tivemos um problema ao processar sua mensagem. Por favor, tente novamente mais tarde.",

  // Mensagem de espera
  WAITING_MESSAGE: "Estou processando sua mensagem. Isso pode levar alguns instantes...",

  // Mensagem de timeout
  TIMEOUT_MESSAGE:
    "Parece que nossa resposta está demorando mais do que o esperado. Por favor, tente novamente mais tarde ou entre em contato pelo nosso site.",
}
