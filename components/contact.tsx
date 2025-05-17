"use client"

import { Instagram, Phone } from "lucide-react"
import { AnimatedSection } from "@/components/animations/animated-section"
import { AnimatedText } from "@/components/animations/animated-text"
import { motion } from "framer-motion"

export function Contact() {
  return (
    <section id="contato" className="py-16 md:py-24 gradient-bg text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.2 + 0.05,
                transform: `scale(${Math.random() * 0.5 + 0.5})`,
                animation: `float ${Math.random() * 20 + 30}s infinite linear`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <AnimatedSection direction="up" className="text-center mb-10 md:mb-16">
          <AnimatedText as="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-wide">
            Entre em Contato
          </AnimatedText>
          <div className="h-1 w-24 sm:w-32 bg-white/40 mx-auto rounded-full mb-4 sm:mb-6"></div>
          <AnimatedText as="p" delay={0.3} className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto tracking-wide">
            Estamos à disposição para esclarecer suas dúvidas e fornecer mais informações sobre o evento.
          </AnimatedText>
        </AnimatedSection>

        <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto">
          <AnimatedSection
            direction="right"
            delay={0.4}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8 flex flex-col items-center text-center border border-white/20 shadow-lg transform transition-all duration-300 hover:bg-white/20 hover:scale-105"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-white flex items-center justify-center mb-4 sm:mb-6 shadow-lg"
            >
              <Phone className="h-8 sm:h-10 w-8 sm:w-10 text-[#821423]" />
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 tracking-wide">Telefone</h3>
            <p className="mb-4 sm:mb-5 opacity-90 text-sm sm:text-base">Fale diretamente com nossa equipe</p>
            <a href="tel:+5562991856701" className="text-xl sm:text-2xl font-bold hover:underline tracking-wide group">
              (62) 99185-6701
              <span className="block h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full mt-1"></span>
            </a>
          </AnimatedSection>

          <AnimatedSection
            direction="left"
            delay={0.4}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8 flex flex-col items-center text-center border border-white/20 shadow-lg transform transition-all duration-300 hover:bg-white/20 hover:scale-105"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-white flex items-center justify-center mb-4 sm:mb-6 shadow-lg"
            >
              <Instagram className="h-8 sm:h-10 w-8 sm:w-10 text-[#821423]" />
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 tracking-wide">Instagram</h3>
            <p className="mb-4 sm:mb-5 opacity-90 text-sm sm:text-base">
              Siga-nos para novidades e conteúdos exclusivos
            </p>
            <a
              href="https://www.instagram.com/grupoinpulse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl sm:text-2xl font-bold hover:underline tracking-wide group"
            >
              @grupoinpulse
              <span className="block h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full mt-1"></span>
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
