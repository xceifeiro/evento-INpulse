"use client"
import { Check } from "lucide-react"
import { AnimatedSection } from "@/components/animations/animated-section"
import { AnimatedText } from "@/components/animations/animated-text"
import { AnimatedItem } from "@/components/animations/animated-item"

export function Benefits() {
  const benefits = [
    "Rodadas de negócios estruturadas",
    "Pitch de vendas personalizado",
    "Networking com +156 empresários",
    "Coquetel de Networking exclusivo",
    "Conexões reais e qualificadas",
    "Lead quente presencial por menos de R$ 2,80",
    "Ambiente propício para fechar negócios",
    "Oportunidade de apresentar sua empresa",
  ]

  return (
    <section id="beneficios" className="py-16 md:py-24 gradient-bg text-white relative overflow-hidden">
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
            Benefícios-Chave
          </AnimatedText>
          <div className="h-1 w-24 sm:w-32 bg-white/40 mx-auto rounded-full mb-4 sm:mb-6"></div>
          <AnimatedText as="p" delay={0.3} className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto tracking-wide">
            O INpulse foi desenhado para maximizar suas oportunidades de negócio em um único evento.
          </AnimatedText>
        </AnimatedSection>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <AnimatedItem
              key={index}
              index={index}
              delay={0.2}
              staggerChildren={0.1}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20 shadow-lg"
            >
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-white flex items-center justify-center mb-4 sm:mb-5 shadow-lg">
                <Check className="h-6 sm:h-7 w-6 sm:w-7 text-[#821423]" />
              </div>
              <p className="font-medium text-base sm:text-lg tracking-wide">{benefit}</p>
            </AnimatedItem>
          ))}
        </div>

        <AnimatedSection
          direction="up"
          delay={0.6}
          className="mt-10 md:mt-16 bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8 text-center border border-white/20 shadow-lg max-w-3xl mx-auto"
        >
          <p className="text-lg sm:text-xl font-bold tracking-wide">
            Não perca a oportunidade de expandir sua rede e aumentar seu faturamento!
          </p>
          <button className="mt-4 px-6 py-2 bg-[#1a8c91] text-white rounded-lg shadow-md hover:bg-[#1a8c91]/20 border-2 border-[#1a8c91] transition duration-300"
          onClick={() => window.open("https://www.inpulse.com.br/inscricao", "_blank")}>
            Participe do INpulse 2025
          </button>
        </AnimatedSection>
      </div>
    </section>
  )
}
