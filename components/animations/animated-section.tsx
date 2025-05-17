"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  once?: boolean
  threshold?: number
  rootMargin?: string
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 50,
  once = true,
  threshold = 0.1,
  rootMargin = "0px",
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView({ threshold, triggerOnce: once, rootMargin })

  // Configurar a direção da animação
  let initial = { opacity: 0 }
  if (direction === "up") initial = { ...initial, y: distance }
  if (direction === "down") initial = { ...initial, y: -distance }
  if (direction === "left") initial = { ...initial, x: distance }
  if (direction === "right") initial = { ...initial, x: -distance }

  return (
    <motion.div
      ref={ref as any}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
