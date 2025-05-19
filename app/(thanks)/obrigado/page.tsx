import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Mail, Phone, Share2 } from "lucide-react"
import { AddToCalendar } from "@/components/add-to-calendar"

export const metadata: Metadata = {
  title: "Compra Confirmada | INpulse - Evento de Networking",
  description: "Sua inscrição para o INpulse foi confirmada com sucesso! Agradecemos pela sua compra.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ObrigadoPage() {
  // Data do evento: 25 de junho de 2025, às 19h
  const eventDate = new Date("2025-06-25T19:00:00-03:00")
  // Data de término do evento (3 horas depois)
  const eventEndDate = new Date("2025-06-25T22:00:00-03:00")

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(eventDate)

  // URL para compartilhamento
  const shareUrl = `https://grupoinpulse.com.br`

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm py-4">
        <div className="container px-4 md:px-6">
          <Link href="/" className="font-anton text-xl sm:text-2xl text-[#821423] tracking-wider">
            INpulse
          </Link>
        </div>
      </header>

      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Banner de confirmação */}
          <div className="bg-gradient-to-r from-[#821423] to-[#1a8c91] text-white p-6 md:p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-[#821423]" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Compra Confirmada!</h1>
            <p className="text-lg opacity-90">Sua inscrição para o INpulse foi realizada com sucesso.</p>
          </div>

          {/* Conteúdo principal */}
          <div className="p-6 md:p-8">
            <div className="mb-8 text-center">
              <p className="text-gray-700 mb-4">
                Agradecemos pela sua compra! Em breve você receberá um e-mail com todos os detalhes da sua inscrição e
                informações importantes sobre o evento.
              </p>
              <div className="inline-block bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-800 mb-4">
                <p className="font-medium">Guarde esta data:</p>
                <p className="flex items-center justify-center gap-2 font-bold">
                  <Calendar className="h-5 w-5" />
                  {formattedDate}
                </p>
              </div>

              <div className="mt-4">
                <AddToCalendar
                  title="INpulse - Evento de Networking"
                  description="Maior evento de Networking e Conexões do Eixo Anápolis, Goiânia e Brasília. Evento sem palestras – no INpulse é você quem fala."
                  location="Villa Borguese, Anápolis/GO"
                  startDate={eventDate}
                  endDate={eventEndDate}
                />
              </div>
            </div>

            {/* Próximos passos */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#821423] mb-4">Próximos Passos</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1a8c91] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Verifique seu e-mail</p>
                    <p className="text-sm text-gray-600">
                      Enviamos um e-mail de confirmação com os detalhes da sua compra e informações adicionais.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1a8c91] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Adicione ao seu calendário</p>
                    <p className="text-sm text-gray-600">
                      Não perca o evento! Adicione a data e horário ao seu calendário para receber lembretes.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1a8c91] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Prepare seu pitch</p>
                    <p className="text-sm text-gray-600">
                      Comece a preparar sua apresentação de 1 minuto para maximizar suas conexões durante o evento.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Contato */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#821423] mb-4">Precisa de ajuda?</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#821423]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-[#821423]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Telefone</p>
                    <a href="tel:+5562991856701" className="text-[#1a8c91] hover:underline">
                      (62) 99185-6701
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#821423]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-[#821423]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">E-mail</p>
                    <a href="mailto:contato@inpulse.com.br" className="text-[#1a8c91] hover:underline">
                      contato@inpulse.com.br
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-[#821423] hover:bg-[#6a1019]">
                <Link href="/">Voltar para a página inicial</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/blog">Visitar nosso blog</Link>
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
