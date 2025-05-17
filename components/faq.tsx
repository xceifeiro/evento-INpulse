"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AnimatedSection } from "@/components/animations/animated-section"
import { AnimatedText } from "@/components/animations/animated-text"
import { motion } from "framer-motion"

export function Faq() {
  const faqItems = [
    {
      question: "Como funciona a rodada de negócios?",
      answer:
        "A rodada de negócios é estruturada em 8 mesas com 11 empresários por rodada. Cada participante tem 1 minuto para apresentar seu pitch. Após cada rodada, os participantes trocam de mesa, maximizando as conexões durante o evento.",
    },
    {
      question: "Quais são as formas de pagamento aceitas?",
      answer:
        "Aceitamos pagamento via PIX, cartão de crédito (parcelamento em até 3x sem juros), boleto bancário e transferência bancária. Após o preenchimento do formulário, nossa equipe entrará em contato para finalizar o pagamento.",
    },
    {
      question: "O que inclui o ingresso EmprePRO?",
      answer:
        "O ingresso EmprePRO inclui acesso à rodada de negócios principal, coquetel de networking, participação em pré-eventos exclusivos, acesso ao grupo exclusivo de empresários e acesso aos leads dos participantes.",
    },
    {
      question: "Até quando posso comprar no 1º lote?",
      answer:
        "O 1º lote estará disponível até o esgotamento das vagas limitadas ou até 15 dias antes do evento, o que ocorrer primeiro. Recomendamos garantir sua vaga o quanto antes para aproveitar o melhor preço.",
    },
    {
      question: "Haverá certificado de participação?",
      answer:
        "Sim, todos os participantes receberão um certificado digital de participação que poderá ser baixado através de um link que será enviado após o evento.",
    },
    {
      question: "Posso transferir meu ingresso para outra pessoa?",
      answer:
        "Sim, é possível transferir seu ingresso para outra pessoa até 5 dias antes do evento. Para isso, entre em contato com nossa equipe informando os dados completos da pessoa que irá em seu lugar.",
    },
    {
      question: "Qual a diferença entre EmprePRO e ConvidadoPRO?",
      answer:
        "A principal diferença é que o EmprePRO inclui participação nas rodadas de negócios, onde você pode apresentar sua empresa para todos os participantes. O ConvidadoPRO dá acesso ao coquetel e networking, mas não inclui participação nas rodadas formais.",
    },
  ]

  return (
    <section id="faq" className="py-16 md:py-24 bg-gray-200">
      <div className="container px-4 md:px-6">
        <AnimatedSection direction="up" className="text-center mb-10 md:mb-12">
          <AnimatedText as="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#821423] mb-2">
            Perguntas Frequentes
          </AnimatedText>
          <div className="h-1 w-24 bg-[#1a8c91] mx-auto rounded-full mb-4 sm:mb-6"></div>
          <AnimatedText as="p" delay={0.3} className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Tire suas dúvidas sobre o evento INpulse.
          </AnimatedText>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.4} className="max-w-3xl mx-auto bg-gray-300 rounded-lg shadow-xl p-4">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-sm sm:text-base py-3 sm:py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-xs sm:text-sm">{item.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.8} className="mt-10 md:mt-12 text-center">
          <p className="text-gray-700 text-sm sm:text-base">
            Ainda tem dúvidas? Entre em contato conosco pelo{" "}
            <a href="tel:+5562991856701" className="text-[#1a8c91] font-medium hover:underline">
              (62) 99185-6701
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
