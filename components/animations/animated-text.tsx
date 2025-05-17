"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
  rootMargin?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
}

export function AnimatedText({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  rootMargin = "0px",
  as: Component = "div",
}: AnimatedTextProps) {
  const { ref, isInView } = useInView({ threshold, triggerOnce: once, rootMargin })

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      ref={ref as any}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={textVariants}
      className={className}
    >
      <Component>{children}</Component>
    </motion.div>
  )
}
