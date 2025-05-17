import { NextResponse } from "next/server"

/* ===================================
 * API ROUTE PARA WEBHOOK DE RESPOSTA
 * ===================================
 * Gerencia o armazenamento temporário e recuperação de respostas
 */

// Armazenamento temporário para as respostas (em produção, use um banco de dados)
// Estrutura: { conversationId: { response: string, timestamp: Date } }
const responseStore = new Map<string, { response: string; timestamp: Date }>()

// Limpa respostas antigas a cada hora (em produção, use um job programado)
setInterval(
  () => {
    const now = new Date()
    for (const [id, data] of responseStore.entries()) {
      // Remove respostas com mais de 1 hora
      if (now.getTime() - data.timestamp.getTime() > 60 * 60 * 1000) {
        responseStore.delete(id)
      }
    }
  },
  60 * 60 * 1000,
) // 1 hora

/* ===================================
 * HANDLER POST - Recebe e armazena respostas
 * ===================================
 */
export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Verifica se os dados contêm o ID da conversa e a resposta
    if (!data.conversationId || !data.response) {
      return NextResponse.json(
        { success: false, message: "Dados inválidos. É necessário fornecer conversationId e response." },
        { status: 400 },
      )
    }

    // Armazena a resposta com timestamp
    responseStore.set(data.conversationId, {
      response: data.response,
      timestamp: new Date(),
    })

    console.log(`Resposta recebida para conversa ${data.conversationId}:`, data.response)

    return NextResponse.json({
      success: true,
      message: "Resposta recebida e armazenada com sucesso",
    })
  } catch (error) {
    console.error("Erro ao processar resposta do webhook:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}

/* ===================================
 * HANDLER GET - Recupera respostas armazenadas
 * ===================================
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const conversationId = url.searchParams.get("conversationId")

    if (!conversationId) {
      return NextResponse.json(
        { success: false, message: "É necessário fornecer o parâmetro conversationId" },
        { status: 400 },
      )
    }

    // Verifica se existe uma resposta para este ID
    const responseData = responseStore.get(conversationId)

    if (!responseData) {
      return NextResponse.json(
        { success: false, message: "Nenhuma resposta encontrada para este ID", found: false },
        { status: 404 },
      )
    }

    // Retorna a resposta e a remove do armazenamento
    responseStore.delete(conversationId)

    return NextResponse.json({
      success: true,
      found: true,
      response: responseData.response,
      timestamp: responseData.timestamp,
    })
  } catch (error) {
    console.error("Erro ao buscar resposta:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
