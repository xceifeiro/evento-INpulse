import Link from "next/link"
import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Compra Confirmada | INpulse - Evento de Networking",
  description: "Sua inscrição para o INpulse foi confirmada com sucesso! Agradecemos pela sua compra.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AgradecimentoPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Verificar se há parâmetros da Eduzz
  // Se não houver, redirecionar para a página de agradecimento completa
  if (!searchParams.transaction_id) {
    redirect("/obrigado")
  }

  // Data do evento: 25 de junho de 2025, às 19h
  const eventDate = new Date("2025-06-25T19:00:00-03:00")
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(eventDate)

  // Extrair informações dos parâmetros da URL
  const transactionId = searchParams.transaction_id as string
  const productName = searchParams.product_name as string
  const buyerName = searchParams.buyer_name as string
  const buyerEmail = searchParams.buyer_email as string

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm py-4">
        <div className="container px-4 md:px-6">
          <Link href="/" className="font-anton text-xl sm:text-2xl text-[#821423] tracking-wider">
            INpulse
          </Link>
        </div>
      </header>

      <div className="container px-4 md:px-6 py-12 md:py-16 flex-grow flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-md overflow-hidden">
          {/* Banner de confirmação */}
          <div className="bg-gradient-to-r from-[#821423] to-[#1a8c91] text-white p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-[#821423]" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Compra Confirmada!</h1>
            <p className="opacity-90">Sua inscrição para o INpulse foi realizada com sucesso.</p>
          </div>

          {/* Conteúdo principal */}
          <div className="p-6">
            <div className="mb-6 text-center">
              <div className="inline-block bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-800 mb-4">
                <p className="font-medium">Guarde esta data:</p>
                <p className="flex items-center justify-center gap-2 font-bold">
                  <Calendar className="h-5 w-5" />
                  {formattedDate}
                </p>
              </div>

              {buyerName && (
                <p className="text-gray-700">
                  Olá, <strong>{buyerName}</strong>! Agradecemos pela sua compra.
                </p>
              )}

              {transactionId && (
                <p className="text-sm text-gray-500 mt-2">
                  Transação: <span className="font-mono">{transactionId}</span>
                </p>
              )}
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-700">
                Em breve você receberá um e-mail com todos os detalhes da sua inscrição e informações importantes sobre
                o evento.
              </p>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-[#821423] hover:bg-[#6a1019]">
                <Link href="/obrigado">Ver detalhes completos</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Voltar para a página inicial</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer simples */}
      <footer className="bg-white border-t py-6">
        <div className="container px-4 md:px-6 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} INpulse. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
