"use client"

import Link from "next/link"
import { AnimatedSection } from "@/components/animations/animated-section"
import { motion } from "framer-motion"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <AnimatedSection direction="up" delay={0.1}>
            <Link href="/">
              <Image src="/logo.webp" alt="INpulse Logo" width={120} height={120} className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-xs sm:text-sm">
              O maior evento de Networking e Conexões do Eixo Anápolis, Goiânia e Brasília.
            </p>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.2}>
            <h4 className="font-bold text-white text-sm sm:text-base mb-3 sm:mb-4">Links Rápidos</h4>
            <ul className="space-y-1 sm:space-y-2">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Link href="#sobre" className="text-xs sm:text-sm hover:text-white transition-colors">
                  Sobre o Evento
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Link href="#rodadas" className="text-xs sm:text-sm hover:text-white transition-colors">
                  Rodadas de Negócios
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Link href="#ingressos" className="text-xs sm:text-sm hover:text-white transition-colors">
                  Ingressos
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Link href="#faq" className="text-xs sm:text-sm hover:text-white transition-colors">
                  FAQ
                </Link>
              </motion.li>
            </ul>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.3}>
            <h4 className="font-bold text-white text-sm sm:text-base mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-1 sm:space-y-2">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Link href="/politica-de-privacidade" className="text-xs sm:text-sm hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Link href="/termos-de-uso" className="text-xs sm:text-sm hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Link href="/admin" className="text-xs sm:text-sm hover:text-white transition-colors">
                  Área Administrativa
                </Link>
              </motion.li>
            </ul>
          </AnimatedSection>
        </div>

        <AnimatedSection
          direction="up"
          delay={0.5}
          className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-xs sm:text-sm">&copy; {new Date().getFullYear()} INpulse. Todos os direitos reservados.</p>
          <div className="mt-3 md:mt-0">
            <p className="text-xs sm:text-sm">Desenvolvido com ❤️ para empresários que buscam conexões reais.</p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  )
}
