"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedItemProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  index?: number
  staggerChildren?: number
}

export function AnimatedItem({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  index = 0,
  staggerChildren = 0.1,
}: AnimatedItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay: delay + index * staggerChildren,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
