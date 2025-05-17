import { AnimatedSection } from "@/components/animations/animated-section"
import { AnimatedText } from "@/components/animations/animated-text"

export function About() {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-gray-200 z-10 shadow-xl relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#821423]/5 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#1a8c91]/5 blur-3xl"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-8 md:gap-12 md:grid-cols-2 items-center">
          <AnimatedSection direction="right" className="space-y-5">
            <div className="inline-block">
              <AnimatedText
                as="h2"
                delay={0.2}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#821423] mb-2"
              >
                Sobre o Evento
              </AnimatedText>
              <div className="h-1 w-24 bg-[#1a8c91] rounded-full"></div>
            </div>
            <AnimatedText as="p" delay={0.4} className="text-base sm:text-lg text-gray-700 leading-relaxed">
              O INpulse é um evento exclusivo de networking onde <strong>não há palestras</strong> - apenas rodadas de
              negócios descontraídas projetadas para aumentar seu faturamento e expandir sua rede de contatos.
            </AnimatedText>
            <AnimatedText as="p" delay={0.6} className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Criamos um ambiente ideal para que empresários possam se conectar, apresentar seus negócios e descobrir
              novas oportunidades de parcerias e vendas.
            </AnimatedText>
            <AnimatedSection
              delay={0.8}
              className="flex flex-col space-y-3 mt-6 bg-gray-50 p-4 sm:p-6 rounded-lg border-l-4 border-[#1a8c91] shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1a8c91] flex items-center justify-center text-white font-bold shadow-md">
                  ✓
                </div>
                <p className="font-medium text-sm sm:text-base">Data: 25 de junho de 2025</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1a8c91] flex items-center justify-center text-white font-bold shadow-md">
                  ✓
                </div>
                <p className="font-medium text-sm sm:text-base">Horário: 19h</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1a8c91] flex items-center justify-center text-white font-bold shadow-md">
                  ✓
                </div>
                <p className="font-medium text-sm sm:text-base">Local: Villa Borguese, Anápolis/GO</p>
              </div>
            </AnimatedSection>
          </AnimatedSection>
          <AnimatedSection
            direction="left"
            delay={0.4}
            className="rounded-xl overflow-hidden shadow-xl border-4 border-white relative h-[300px] sm:h-[350px] md:h-[450px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#821423]/20 to-[#1a8c91]/20 z-10 pointer-events-none"></div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.253482394488!2d-48.908574599999994!3d-16.3099874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ea5ba25afc37d%3A0xf8cd262f8415597e!2sVilla%20Borghese!5e0!3m2!1spt-BR!2sbr!4v1747392500553!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Villa Borguese, Anápolis/GO"
              className="relative z-0"
            ></iframe>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
