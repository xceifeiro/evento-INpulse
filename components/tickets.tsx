"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, X, Clock } from "lucide-react"
import { Countdown } from "@/components/countdown"
import { AnimatedSection } from "@/components/animations/animated-section"
import { AnimatedText } from "@/components/animations/animated-text"
import { motion } from "framer-motion"

// Definir tipo para os tipos de ingressos
type TicketType = "EmprePRO" | "ConvidadoPRO"

// Add this to the top of the file, after the imports
const PricingCard = ({
  title,
  description,
  price,
  features,
  popular = false,
  onClickBuy,
  priceInfo,
  delay = 0,
}: {
  title: string
  description: string
  price: string
  features: { included: boolean; text: string }[]
  popular?: boolean
  onClickBuy: () => void
  priceInfo: string[]
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
    >
      <Card
        className={`border-2 ${popular ? "border-[#1a8c91]" : "border-gray-200"} relative overflow-hidden transform transition-all duration-300 hover:shadow-xl`}
      >
        {popular && (
          <div className="absolute top-0 right-0 bg-[#1a8c91] text-white px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium">
            Mais Popular
          </div>
        )}
        <CardHeader className={`${popular ? "bg-[#821423]/5" : "bg-gray-50"} p-4 sm:p-6`}>
          <CardTitle className={`text-xl sm:text-2xl ${popular ? "text-[#1a8c91]" : ""}`}>{title}</CardTitle>
          <CardDescription className="text-sm sm:text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold">{price}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">3º Lote - Vagas Limitadas</p>
            </div>

            <div className="space-y-2 sm:space-y-3 mt-2">
              {/* Price Info */}
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 sm:gap-3">
                  {feature.included ? (
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-[#1a8c91] shrink-0 mt-0.5" />
                  ) : (
                    <X className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400 shrink-0 mt-0.5" />
                  )}
                  <span className={`text-xs sm:text-sm ${feature.included ? "" : "text-gray-500"}`}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 sm:p-6">
          <Button
            onClick={onClickBuy}
            className={`w-full ${popular ? "bg-[#1a8c91] hover:bg-[#1a8c91]/90" : ""} shadow-md transform transition-all hover:bg-[#1a8c91] hover:text-white duration-300 hover:scale-105 text-sm sm:text-base`}
            variant={popular ? "default" : "outline"}
          >
            Comprar Agora
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function Tickets() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    position: "",
    phone: "",
    ticketType: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [webhookError, setWebhookError] = useState<string | null>(null)

  // Links de checkout da Eduzz para cada tipo de ingresso
  // Substitua os IDs de produto pelos seus IDs reais da Eduzz
  const checkoutLinks: Record<TicketType, string> = {
    EmprePRO: "https://chk.eduzz.com/39VJBK7Y9R", // Substitua XXXXXX pelo ID do seu produto EmprePRO
    ConvidadoPRO: "https://chk.eduzz.com/39YB8NGQWO", // Substitua YYYYYY pelo ID do seu produto ConvidadoPRO
  }

  // URL do webhook N8N - Substitua pela sua URL real
  const WEBHOOK_N8N_URL = "https://n8n-augustho-n8n.scyobq.easypanel.host/webhook/115f42f1-3d8f-4d6d-973a-406aeceb39e5"

  // Data do evento: 25 de junho de 2025, às 19h
  const eventDate = new Date("2025-06-25T19:00:00-03:00")

  // Data de encerramento do 1º lote: 25 de maio de 2025
  const firstLotEndDate = new Date("2025-06-25T23:59:59-03:00")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Função para formatar corretamente os parâmetros para a Eduzz
  const formatEduzzParam = (value: string): string => {
    // Substitui espaços por "+" em vez de usar encodeURIComponent
    return value.replace(/ /g, "+")
  }

  const handleSubmit = async (e: React.FormEvent, ticketType: TicketType) => {
    e.preventDefault()
    setIsSubmitting(true)
    setWebhookError(null)

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

      setIsSuccess(true)

      // Construir a URL de checkout da Eduzz com os parâmetros do formulário
      const baseUrl = checkoutLinks[ticketType]

      // Construir a URL manualmente para evitar problemas de codificação
      let checkoutUrl = baseUrl

      // Adicionar parâmetros usando a função formatEduzzParam
      checkoutUrl += `?name=${formatEduzzParam(formData.name)}`
      checkoutUrl += `&email=${formatEduzzParam(formData.email)}`
      checkoutUrl += `&phone=${formatEduzzParam(formData.phone)}`
      checkoutUrl += `&custom_company=${formatEduzzParam(formData.company)}`
      checkoutUrl += `&custom_position=${formatEduzzParam(formData.position)}`

      // Adicionar UTM para rastreamento (opcional)
      checkoutUrl += `&utm_source=website`
      checkoutUrl += `&utm_medium=form`
      checkoutUrl += `&utm_campaign=inpulse_event`

      // Após 2 segundos, redirecionar para o checkout
      setTimeout(() => {
        window.location.href = checkoutUrl
      }, 2000)
    } catch (error) {
      console.error("Error submitting form:", error)
    setWebhookError(error instanceof Error ? error.message : "Erro ao processar sua solicitação")
      setIsSuccess(false)
      setIsSubmitting(false)
    }
  }

  return (
    <section id="ingressos" className="py-16 md:py-24 bg-gray-200 relative overflow-hidden z-[8] shadow-lg">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#821423]/5 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#1a8c91]/5 blur-3xl"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <AnimatedSection direction="up" className="text-center mb-10 md:mb-16">
          <AnimatedText as="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#821423] mb-2">
            Ingressos
          </AnimatedText>
          <div className="h-1 w-24 bg-[#1a8c91] mx-auto rounded-full mb-4 sm:mb-6"></div>
          <AnimatedText as="p" delay={0.3} className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Escolha a credencial que melhor se adapta às suas necessidades e garanta sua participação neste evento
            exclusivo.
          </AnimatedText>
        </AnimatedSection>

        {/* Contador para o fim do 1º lote */}
        <AnimatedSection direction="up" delay={0.4} className="mb-10 bg-red-800/20 rounded-lg p-6 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-[#821423] flex items-center gap-2 justify-center md:justify-start">
                <Clock className="h-5 w-5" /> Já estamos com 50%!
              </h3>
              <b className="text-[#1a8c91] mt-1">O INpulse vai começar em:</b>
            </div>
            <div className="w-full md:w-auto">
              <Countdown targetDate={firstLotEndDate} />
            </div>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <Dialog>
            <DialogTrigger asChild>
              <div className="contents">
                <PricingCard
                  title="EmprePRO"
                  description="Experiência completa de networking"
                  price="R$ 427,00"
                  popular={true}
                  delay={0.5}
                  onClickBuy={() => {}}
                  priceInfo={["2º Lote: R$ 227,00", "3º Lote: R$ 247,00"]}
                  features={[
                    { included: true, text: "Acesso à Rodada de Negócios Principal" },
                    { included: true, text: "Coquetel de Networking" },
                    { included: true, text: "Participação em pré-eventos exclusivos" },
                    { included: true, text: "Grupo exclusivo de empresários" },
                    { included: true, text: "Acesso aos leads dos participantes" },
                  ]}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-4 sm:p-6">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl">Comprar Ingresso EmprePRO</DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">
                  Preencha seus dados para garantir sua vaga no INpulse.
                </DialogDescription>
              </DialogHeader>
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-4 sm:py-6 space-y-3 sm:space-y-4"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-center">Solicitação Enviada!</h3>
                  <p className="text-center text-xs sm:text-sm text-muted-foreground">
                    Redirecionando para o checkout em instantes...
                  </p>
                  <div className="mt-2 animate-pulse">
                    <div className="h-1 w-16 bg-gray-300 rounded-full"></div>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={(e) => handleSubmit(e, "EmprePRO")}>
                  <div className="grid gap-3 sm:gap-4 py-3 sm:py-4">
                    <div className="grid gap-1 sm:gap-2">
                      <Label htmlFor="name" className="text-xs sm:text-sm">
                        Nome Completo
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="grid gap-1 sm:gap-2">
                      <Label htmlFor="email" className="text-xs sm:text-sm">
                        E-mail
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="grid gap-1 sm:gap-2">
                      <Label htmlFor="company" className="text-xs sm:text-sm">
                        Empresa
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="grid gap-1 sm:gap-2">
                      <Label htmlFor="position" className="text-xs sm:text-sm">
                        Cargo
                      </Label>
                      <Input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="grid gap-1 sm:gap-2">
                      <Label htmlFor="phone" className="text-xs sm:text-sm">
                        Telefone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                  {webhookError && <div className="mt-2 text-sm text-red-600 text-center">{webhookError}</div>}
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="w-full bg-[#821423] hover:bg-[#6a1019] text-xs sm:text-sm"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Finalizar Compra"}
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <div className="contents">
                <PricingCard
                  title="ConvidadoPRO"
                  description="Experiência de networking"
                  price="R$ 247,00"
                  popular={false}
                  delay={0.6}
                  onClickBuy={() => {}}
                  priceInfo={["2º Lote: R$ 227,00", "3º Lote: R$ 247,00"]}
                  features={[
                    { included: false, text: "Acesso à Rodada de Negócios Principal" },
                    { included: true, text: "Coquetel de Networking" },
                    { included: true, text: "Participação em pré-eventos exclusivos" },
                    { included: true, text: "Grupo exclusivo de empresários" },
                    { included: true, text: "Acesso aos leads dos participantes" },
                  ]}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-4 sm:p-6">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl">Comprar Ingresso ConvidadoPRO</DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">
                  Preencha seus dados para garantir sua vaga no INpulse.
                </DialogDescription>
              </DialogHeader>
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-4 sm:py-6 space-y-3 sm:space-y-4"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-center">Solicitação Enviada!</h3>
                  <p className="text-center text-xs sm:text-sm text-muted-foreground">
                    Redirecionando para o checkout em instantes...
                  </p>
                  <div className="mt-2 animate-pulse">
                    <div className="h-1 w-16 bg-gray-300 rounded-full"></div>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={(e) => handleSubmit(e, "ConvidadoPRO")}>
                  <div className="grid gap-3 sm:gap-4 py-3 sm:py-4">
                    <div className="grid gap-1 sm:gap-2">
                      <Label htmlFor="name-conv" className="text-xs sm:text-sm">
                        Nome Completo
                      </Label>
                      <Input
                        id="name-conv"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="grid gap-1 sm:gap-2">
                      <Label htmlFor="email-conv" className="text-xs sm:text-sm">
                        E-mail
                      </Label>
                      <Input
                        id="email-conv"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="grid gap-1 sm:gap-2">
                      <Label htmlFor="company-conv" className="text-xs sm:text-sm">
                        Empresa
                      </Label>
                      <Input
                        id="company-conv"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="grid gap-1 sm:gap-2">
                      <Label htmlFor="position-conv" className="text-xs sm:text-sm">
                        Cargo
                      </Label>
                      <Input
                        id="position-conv"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        className="text-xs sm:text-sm"
                      />
                    </div>
                    <div className="grid gap-1 sm:gap-2">
                      <Label htmlFor="phone-conv" className="text-xs sm:text-sm">
                        Telefone
                      </Label>
                      <Input
                        id="phone-conv"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                  {webhookError && <div className="mt-2 text-sm text-red-600 text-center">{webhookError}</div>}
                  <DialogFooter>
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full text-xs sm:text-sm"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Finalizar Compra"}
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <AnimatedSection direction="up" delay={0.7} className="mt-10 md:mt-16 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-yellow-50 border border-yellow-200 rounded-lg px-4 sm:px-8 py-3 sm:py-5 text-yellow-800 shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <p className="font-medium flex items-center justify-center text-sm sm:text-base">
              <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
              Vagas limitadas: últimas unidades esgotando...
            </p>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2">Garanta seu lugar neste evento exclusivo!</p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}
