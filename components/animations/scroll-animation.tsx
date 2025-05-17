"use client"

import { motion, useScroll } from "framer-motion"
import { type ReactNode, useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useTransform } from "framer-motion"

interface ScrollAnimationProps {
  children: ReactNode
  animation?: "fade" | "slide-up" | "slide-down" | "scale"
  threshold?: number
  className?: string
}

export function ScrollAnimation({
  children,
  animation = "fade",
  threshold = 0.1,
  className = "",
}: ScrollAnimationProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", `start ${1 - threshold}`],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])
  const yDown = useTransform(scrollYProgress, [0, 1], [-50, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const getAnimationProps = () => {
    switch (animation) {
      case "fade":
        return { opacity }
      case "slide-up":
        return { opacity, y }
      case "slide-down":
        return { opacity, y: yDown }
      case "scale":
        return { opacity, scale }
      default:
        return { opacity }
    }
  }

  return (
    <motion.div ref={ref} style={getAnimationProps()} className={className}>
      {children}
    </motion.div>
  )
}
