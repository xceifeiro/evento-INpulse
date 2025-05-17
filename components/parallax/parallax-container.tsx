"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, type ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

type Direction = "up" | "down" | "left" | "right"

interface ParallaxContainerProps {
  children: ReactNode
  direction?: Direction
  speed?: number // 0 a 1, onde 1 é o efeito máximo
  className?: string
  delay?: number
}

export function ParallaxContainer({
  children,
  direction = "up",
  speed = 0.3,
  className = "",
  delay = 0,
}: ParallaxContainerProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calcular a direção e a distância do movimento
  const getTransformValues = () => {
    const distance = 100 * speed

    switch (direction) {
      case "up":
        return [distance, 0]
      case "down":
        return [-distance, 0]
      case "left":
        return [0, distance]
      case "right":
        return [0, -distance]
      default:
        return [distance, 0]
    }
  }

  const [startValue, endValue] = getTransformValues()

  // Criar as transformações com base na direção
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" || direction === "right" ? [startValue, endValue] : [0, 0],
  )

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" || direction === "down" ? [startValue, endValue] : [0, 0],
  )

  // Se o usuário preferir movimento reduzido, não aplicar efeito
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}
