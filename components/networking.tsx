import Image from "next/image"
import { AnimatedSection } from "@/components/animations/animated-section"
import { AnimatedText } from "@/components/animations/animated-text"
import { AnimatedItem } from "@/components/animations/animated-item"

export function Networking() {
  return (
    <section className="py-16 md:py-24 bg-gray-200 z-[8] shadow-xl">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <AnimatedSection direction="right" delay={0.2} className="order-2 md:order-1 space-y-6">
            <AnimatedText as="h2" className="text-3xl md:text-4xl font-bold text-[#821423]">
              Coquetel de Networking
            </AnimatedText>
            <AnimatedText as="p" delay={0.3} className="text-lg text-gray-700">
              Após as rodadas de negócios, desfrute de um elegante coquetel especialmente planejado para criar um
              ambiente perfeito para aprofundar conexões e fechar parcerias.
            </AnimatedText>

            <AnimatedSection delay={0.5} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#1a8c91]">
              <AnimatedText as="h3" className="text-xl font-bold text-[#1a8c91] mb-3">
                O que esperar:
              </AnimatedText>
              <ul className="space-y-3 text-gray-700">
                <AnimatedItem delay={0.6} index={0} className="flex items-start gap-2">
                  <span className="text-[#821423] font-bold">•</span>
                  <span>Finger food delicado e sofisticado</span>
                </AnimatedItem>
                <AnimatedItem delay={0.6} index={1} className="flex items-start gap-2">
                  <span className="text-[#821423] font-bold">•</span>
                  <span>Bebidas selecionadas</span>
                </AnimatedItem>
                <AnimatedItem delay={0.6} index={2} className="flex items-start gap-2">
                  <span className="text-[#821423] font-bold">•</span>
                  <span>Ambiente exclusivo para networking descontraído</span>
                </AnimatedItem>
                <AnimatedItem delay={0.6} index={3} className="flex items-start gap-2">
                  <span className="text-[#821423] font-bold">•</span>
                  <span>Oportunidade para aprofundar conexões iniciadas nas rodadas</span>
                </AnimatedItem>
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.8} className="bg-[#1a8c91]/5 p-4 rounded-lg">
              <p className="italic text-gray-700">
                "O verdadeiro valor do networking acontece nos momentos informais, onde relações genuínas são
                construídas."
              </p>
            </AnimatedSection>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.4} className="order-1 md:order-2">
            <Image
              src="/coquetel-img.webp"
              alt="Coquetel de Networking"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg shadow-xl"
              priority
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
