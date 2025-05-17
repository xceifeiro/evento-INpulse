"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle, Loader2 } from "lucide-react"
import { createClientComponentClient } from "@/lib/supabase/client"

export function Newsletter() {
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")
    try {
      // Verificar se o email já existe
      const { data: existingSubscriber } = await supabase
        .from("newsletter_subscribers")
        .select("id")
        .eq("email", email)
        .single()

      if (existingSubscriber) {
        setStatus("success")
        setMessage("Você já está inscrito em nossa newsletter!")
        return
      }

      // Adicionar novo inscrito
      const { error } = await supabase.from("newsletter_subscribers").insert({
        email,
        subscribed_at: new Date().toISOString(),
      })

      if (error) throw error

      setStatus("success")
      setMessage("Inscrição realizada com sucesso!")
      setEmail("")
    } catch (error) {
      console.error("Erro ao inscrever na newsletter:", error)
      setStatus("error")
      setMessage("Ocorreu um erro. Por favor, tente novamente.")
    }
  }

  return (
    <Card className="bg-gradient-to-br from-[#821423]/5 to-[#1a8c91]/5 border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-[#821423]" />
          Newsletter INpulse
        </CardTitle>
        <CardDescription>
          Receba novidades sobre networking, dicas para empresários e informações sobre os próximos eventos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === "success" ? (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
            <CheckCircle className="h-5 w-5" />
            <p>{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                </>
              ) : (
                "Inscrever-se"
              )}
            </Button>
          </form>
        )}
        {status === "error" && <p className="text-red-500 text-sm mt-2">{message}</p>}
      </CardContent>
    </Card>
  )
}
