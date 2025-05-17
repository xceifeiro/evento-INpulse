"use client"

import { useState, useEffect } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownProps {
  targetDate: Date
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference <= 0) {
        setIsExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    // Calcular inicialmente
    setTimeLeft(calculateTimeLeft())

    // Atualizar a cada segundo
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(timer)
  }, [targetDate])

  // Função para adicionar zero à esquerda se necessário
  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString()
  }

  // Renderizar o contador
  return (
    <div className="w-full max-w-3xl mx-auto">
      {isExpired ? (
        <div className="bg-[#821423]/10 p-4 rounded-lg text-center">
          <p className="text-lg font-medium text-[#821423]">O evento já começou!</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {/* Dias */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square bg-white/10 backdrop-blur-sm rounded-lg border text-[#1a8c91] border-white/20 shadow-lg flex flex-col items-center justify-center">
              <span className="text-xl sm:text-3xl md:text-4xl font-bold tabular-nums">
                {formatNumber(timeLeft.days)}
              </span>
            </div>
            <span className="mt-1 text-xs font-medium">Dias</span>
          </div>

          {/* Horas */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square bg-white/10 backdrop-blur-sm rounded-lg border text-[#1a8c91] border-white/20 shadow-lg flex flex-col items-center justify-center">
              <span className="text-xl sm:text-3xl md:text-4xl font-bold tabular-nums">
                {formatNumber(timeLeft.hours)}
              </span>
            </div>
            <span className="mt-1 text-xs font-medium">Horas</span>
          </div>

          {/* Minutos */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square bg-white/10 backdrop-blur-sm rounded-lg border text-[#1a8c91] border-white/20 shadow-lg flex flex-col items-center justify-center">
              <span className="text-xl sm:text-3xl md:text-4xl font-bold tabular-nums">
                {formatNumber(timeLeft.minutes)}
              </span>
            </div>
            <span className="mt-1 text-xs font-medium">Minutos</span>
          </div>

          {/* Segundos */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square bg-white/10 backdrop-blur-sm rounded-lg border text-[#1a8c91] border-white/20 shadow-lg flex flex-col items-center justify-center relative overflow-hidden">
              <div
                className="absolute inset-0 bg-white/5 animate-pulse rounded-lg"
                style={{ animationDuration: "1s" }}
              ></div>
              <span className="text-xl sm:text-3xl md:text-4xl font-bold tabular-nums relative z-10">
                {formatNumber(timeLeft.seconds)}
              </span>
            </div>
            <span className="mt-1 text-xs font-medium">Segundos</span>
          </div>
        </div>
      )}
    </div>
  )
}
