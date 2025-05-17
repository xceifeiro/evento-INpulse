"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Countdown } from "@/components/countdown"
import { motion } from "framer-motion"

export function Hero() {
  // Data do evento: 25 de junho de 2025, às 19h
  const eventDate = new Date("2025-06-25T19:00:00-03:00")

  return (
    <section className="gradient-bg text-white py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-hero.webp"
          alt="Evento de networking"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 z-0">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm backdrop-blur-sm border border-white/20 shadow-lg"
          >
            <span className="tracking-wider">25 de junho, 19h - Villa Borguese, Anápolis/GO</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-anton text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl leading-tight tracking-wider font-extralight"
          >
            Maior evento de Networking e Conexões do Eixo Anápolis, Goiânia e Brasília
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl max-w-2xl font-poppins font-medium tracking-wide"
          >
            Evento sem palestras – no INpulse é você quem fala.
          </motion.p>

          {/* Contador regressivo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-full max-w-lg mx-auto mt-4"
          >
            <div className="transform scale-75 sm:scale-75 md:scale-75">
              <Countdown targetDate={eventDate} />
            </div>
          </motion.div>

          {/* Botões de ação */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-[#821423] hover:bg-white/90 shadow-lg transform hover:scale-105 transition-all duration-300 px-6 sm:px-8 w-full sm:w-auto"
            >
              <Link href="#ingressos">Garanta sua vaga</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white bg-white/20 hover:text-[#821423] hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto"
            >
              <Link href="#sobre">Saiba mais</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-6 inline-block rounded-lg bg-white/10 px-4 py-2 text-xs sm:text-sm backdrop-blur-sm border border-white/20 shadow-lg"
          >
            <p className="font-medium tracking-wide flex items-center">
              <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-[#1a8c91] rounded-full mr-2 animate-pulse"></span>
              Vagas limitadas: últimas unidades esgotando...
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
