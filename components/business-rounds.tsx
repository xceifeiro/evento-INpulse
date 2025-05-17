import type React from "react"
import Image from "next/image"
import { AnimatedSection } from "@/components/animations/animated-section"
import { AnimatedText } from "@/components/animations/animated-text"

const AnimatedItem = ({
  children,
  delay,
  index,
  className,
}: { children: React.ReactNode; delay: number; index: number; className?: string }) => {
  return (
    <AnimatedSection direction="up" delay={delay + index * 0.1} className={className}>
      {children}
    </AnimatedSection>
  )
}

export function BusinessRounds() {
  return (
    <section id="rodadas" className="py-16 md:py-24 bg-gray-200 z-[9] shadow-xl">
      <div className="container px-4 md:px-6">
        <AnimatedSection direction="up" className="text-center mb-8 md:mb-12">
          <AnimatedText as="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#821423] mb-2">
            Rodada de Negócios
          </AnimatedText>
          <div className="h-1 w-24 bg-[#1a8c91] rounded-full mx-auto mb-4"></div>
          <AnimatedText as="p" delay={0.3} className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Uma experiência única de networking estruturado para maximizar suas conexões e oportunidades de negócio.
          </AnimatedText>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          <AnimatedSection direction="right" delay={0.4} className="rounded-lg overflow-hidden order-2 md:order-1">
            <Image
              src="/rounds-img.webp"
              alt="Rodada de Negócios"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
              priority
            />
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.4} className="space-y-5 order-1 md:order-2">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-[#1a8c91]">
              <AnimatedText as="h3" className="text-xl sm:text-2xl font-bold text-[#1a8c91] mb-2">
                Como funciona:
              </AnimatedText>
              <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                <AnimatedItem delay={0.5} index={0} className="flex items-start gap-2">
                  <span className="text-[#821423] font-bold">•</span>
                  <span>
                    <strong>13 mesas</strong> estrategicamente organizadas
                  </span>
                </AnimatedItem>
                <AnimatedItem delay={0.5} index={1} className="flex items-start gap-2">
                  <span className="text-[#821423] font-bold">•</span>
                  <span>
                    <strong>12 empresários</strong> por rodada
                  </span>
                </AnimatedItem>
                <AnimatedItem delay={0.5} index={2} className="flex items-start gap-2">
                  <span className="text-[#821423] font-bold">•</span>
                  <span>
                    <strong>Tempo de pitch</strong> por participante e por rodada
                  </span>
                </AnimatedItem>
                <AnimatedItem delay={0.5} index={3} className="flex items-start gap-2">
                  <span className="text-[#821423] font-bold">•</span>
                  <span>Múltiplas rodadas para maximizar conexões</span>
                </AnimatedItem>
                <AnimatedItem delay={0.5} index={4} className="flex items-start gap-2">
                  <span className="text-[#821423] font-bold">•</span>
                  <span>Ambiente descontraído e produtivo</span>
                </AnimatedItem>
              </ul>
            </div>

            <AnimatedSection delay={0.8} className="bg-[#821423]/5 p-4 sm:p-6 rounded-lg">
              <p className="text-base sm:text-lg font-medium">
                Em apenas uma noite, você terá a oportunidade de apresentar seu negócio para dezenas de potenciais
                parceiros e clientes, gerando leads quentes por menos de{" "}
                <strong className="text-[#821423]">R$ 2,80 por contato</strong>.
              </p>
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
