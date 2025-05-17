"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, type ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface ParallaxHorizontalProps {
  children: ReactNode
  className?: string
  speed?: number // 0 a 1, onde 1 é o efeito máximo
  reverse?: boolean // Inverter a direção do movimento
}

export function ParallaxHorizontal({
  children,
  className = "",
  speed = 0.3,
  reverse = false,
}: ParallaxHorizontalProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calcular a distância do movimento
  const distance = 200 * speed * (reverse ? -1 : 1)

  // Usar useTransform para criar o efeito de parallax horizontal
  const x = useTransform(scrollYProgress, [0, 1], [distance, 0])

  // Se o usuário preferir movimento reduzido, não aplicar efeito
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div ref={ref} className={className} style={{ x }}>
      {children}
    </motion.div>
  )
}
