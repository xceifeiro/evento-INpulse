import { NextResponse } from "next/server"

/* ===================================
 * API ROUTE PARA TESTE DE WEBHOOK
 * ===================================
 * Rota de API de exemplo para testar o webhook localmente
 */
export async function POST(request: Request) {
  try {
    const data = await request.json()

    console.log("Dados recebidos do chat:", data)

    // Aqui você pode processar os dados como desejar
    // Por exemplo, salvar em um banco de dados, enviar um email, etc.

    return NextResponse.json({
      success: true,
      message: "Dados recebidos com sucesso",
      receivedData: data,
    })
  } catch (error) {
    console.error("Erro ao processar webhook:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
