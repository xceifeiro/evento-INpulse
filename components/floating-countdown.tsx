"use client"

import { useState, useEffect } from "react"
import { Countdown } from "@/components/countdown"
import { X } from "lucide-react"

export function FloatingCountdown() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  // Data do evento: 25 de junho de 2025, às 19h
  const eventDate = new Date("2025-06-25T19:00:00-03:00")

  useEffect(() => {
    // Verificar se o contador já foi fechado anteriormente
    const dismissed = localStorage.getItem("countdownDismissed")
    if (dismissed === "true") {
      setIsDismissed(true)
      return
    }

    const handleScroll = () => {
      // Mostrar o contador flutuante quando o usuário rolar além de 800px
      if (window.scrollY > 800) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem("countdownDismissed", "true")
  }

  if (isDismissed || !isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm bg-[#821423] text-white p-4 rounded-lg shadow-lg animate-fade-in">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-white/80 hover:text-white"
        aria-label="Fechar contador"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="mb-2 text-center">
        <h3 className="font-bold text-sm">Contagem regressiva para o INpulse</h3>
        <p className="text-xs text-white/80">25 de junho, 19h</p>
      </div>
      <div className="scale-75 origin-top">
        <Countdown targetDate={eventDate} />
      </div>
    </div>
  )
}
