"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, createElement, useMemo } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface ParallaxTextProps {
  text: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  className?: string
  speed?: number // 0 a 1, onde 1 é o efeito máximo
  direction?: "up" | "down"
}

export function ParallaxText({ text, as = "p", className = "", speed = 0.3, direction = "up" }: ParallaxTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Dividir o texto em palavras
  const words = text.split(" ")

  const yValues = useMemo(() => {
    return words.map((_, i) => {
      // Cada palavra tem uma velocidade ligeiramente diferente
      const wordSpeed = speed * (1 + (i % 3) * 0.2)
      const distance = 50 * wordSpeed * (direction === "up" ? 1 : -1)
      return useTransform(scrollYProgress, [0, 1], [distance, 0])
    })
  }, [words, speed, direction, scrollYProgress])

  // Se o usuário preferir movimento reduzido, renderizar texto normal
  if (prefersReducedMotion) {
    return createElement(as, { className }, text)
  }

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => {
        return (
          <motion.span
            key={i}
            style={{ y: yValues[i], display: "inline-block" }}
            className="mr-[0.25em] whitespace-nowrap"
          >
            {word}
          </motion.span>
        )
      })}
    </div>
  )
}
