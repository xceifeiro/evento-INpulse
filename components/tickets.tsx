"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AnimatedSection } from "@/components/animations/animated-section"
import { AnimatedItem } from "@/components/animations/animated-item"

type TicketType = "EmprePRO" | "ConvidadoPRO"

export function Tickets() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [ticketType, setTicketType] = useState<TicketType>("EmprePRO")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    position: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [webhookError, setWebhookError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const openTicketDialog = (type: TicketType) => {
    setTicketType(type)
    setIsDialogOpen(true)
  }

  // Função para formatar parâmetros para a URL da Eduzz
  const formatEduzzParam = (value: string) => {
    // Substitui espaços por + em vez de usar encodeURIComponent
    return value.replace(/ /g, "+")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setWebhookError(null)
    setIsSubmitting(true)

    try {
      // Validação básica
      if (!formData.name || !formData.email || !formData.phone) {
        throw new Error("Por favor, preencha todos os campos obrigatórios.")
      }

      // URL do webhook N8N - Substitua pela sua URL real
      const WEBHOOK_N8N_URL = "https://seu-servidor-n8n.com/webhook/inpulse-form"

      try {
        // Enviar dados para o webhook N8N
        const webhookResponse = await fetch(WEBHOOK_N8N_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...formData,
            ticketType,
            timestamp: new Date().toISOString(),
            source: "website_form",
            eventName: "INpulse",
            productPrice: ticketType === "EmprePRO" ? "427.00" : "247.00",
            productName: ticketType === "EmprePRO" ? "Ingresso EmprePRO" : "Ingresso ConvidadoPRO",
          }),
        })

        if (!webhookResponse.ok) {
          // Se o webhook falhar, registrar o erro mas continuar com o checkout
          console.error("Webhook error:", await webhookResponse.text())
          // Opcionalmente, você pode decidir não continuar com o checkout se o webhook falhar
          // throw new Error("Falha ao enviar dados para o sistema. Por favor, tente novamente.");
        }
      } catch (webhookErr) {
        console.error("Webhook error:", webhookErr)
        setWebhookError(
          "Aviso: Seus dados foram enviados para o checkout, mas houve um problema ao registrá-los em nosso sistema.",
        )
        // Continuamos com o checkout mesmo se o webhook falhar
      }

      // Construir URL de checkout da Eduzz
      const productId = ticketType === "EmprePRO" ? "39VJBK7Y9R" : "39YB8NGQWO" // Substitua pelos IDs reais dos produtos

      // Construir a URL manualmente para garantir que os espaços sejam tratados corretamente
      let checkoutUrl = `https://chk.eduzz.com/XXXXXXXXXX?`

      // Adicionar parâmetros formatados corretamente
      checkoutUrl += `name=${formatEduzzParam(formData.name)}`
      checkoutUrl += `&email=${encodeURIComponent(formData.email)}`
      checkoutUrl += `&phone=${encodeURIComponent(formData.phone)}`

      // Adicionar campos personalizados se preenchidos
      if (formData.company) {
        checkoutUrl += `&custom_company=${formatEduzzParam(formData.company)}`
      }
      if (formData.position) {
        checkoutUrl += `&custom_position=${formatEduzzParam(formData.position)}`
      }

      // Adicionar UTM parameters se necessário
      // checkoutUrl += `&utm_source=website&utm_medium=form&utm_campaign=inpulse`

      // Redirecionar para o checkout
      window.location.href = checkoutUrl
    } catch (error: any) {
      setFormError(error.message)
      setIsSubmitting(false)
    }
  }

  return (
    <section id="tickets" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ingressos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha o ingresso ideal para você e garanta sua participação no maior evento de networking do Brasil.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatedItem delay={0.1}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-[#821423] p-6 text-white text-center">
                <h3 className="text-2xl font-bold">Ingresso EmprePRO</h3>
                <p className="text-lg opacity-90">Para empreendedores</p>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-900">R$ 427</span>
                  <span className="text-gray-600 ml-2">/ pessoa</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Acesso a todas as palestras</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Participação nas rodadas de negócios</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Coffee break e almoço</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Material digital exclusivo</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Certificado de participação</span>
                  </li>
                </ul>
                <Button
                  onClick={() => openTicketDialog("EmprePRO")}
                  className="w-full bg-[#821423] hover:bg-[#6a1019] text-white py-3 rounded-md font-medium"
                >
                  Garantir Ingresso
                </Button>
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem delay={0.2}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-[#1a8c91] p-6 text-white text-center">
                <h3 className="text-2xl font-bold">Ingresso ConvidadoPRO</h3>
                <p className="text-lg opacity-90">Para convidados</p>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-900">R$ 247</span>
                  <span className="text-gray-600 ml-2">/ pessoa</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Acesso a todas as palestras</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Coffee break</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Material digital básico</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Certificado de participação</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg
                      className="w-5 h-5 text-gray-300 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    <span>Sem participação nas rodadas de negócios</span>
                  </li>
                </ul>
                <Button
                  onClick={() => openTicketDialog("ConvidadoPRO")}
                  className="w-full bg-[#1a8c91] hover:bg-[#14696d] text-white py-3 rounded-md font-medium"
                >
                  Garantir Ingresso
                </Button>
              </div>
            </div>
          </AnimatedItem>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{ticketType === "EmprePRO" ? "Ingresso EmprePRO" : "Ingresso ConvidadoPRO"}</DialogTitle>
              <DialogDescription>Preencha seus dados para prosseguir com a compra do ingresso.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Nome da sua empresa"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Cargo</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Seu cargo na empresa"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </div>
              {formError && <div className="mt-2 text-sm text-red-600 text-center">{formError}</div>}
              {webhookError && <div className="mt-2 text-sm text-red-600 text-center">{webhookError}</div>}
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Processando..." : "Prosseguir para pagamento"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
