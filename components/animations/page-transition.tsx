"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"

type TransitionType = "fade" | "slide" | "scale" | "none"

interface PageTransitionProps {
  children: ReactNode
  transitionType?: TransitionType
  duration?: number
}

export function PageTransition({ children, transitionType = "fade", duration = 0.3 }: PageTransitionProps) {
  const pathname = usePathname()
  const [renderKey, setRenderKey] = useState(pathname)

  // Update the key when the pathname changes to trigger the animation
  useEffect(() => {
    setRenderKey(pathname)
  }, [pathname])

  // Define different animation variants
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.05 },
    },
    none: {
      initial: {},
      animate: {},
      exit: {},
    },
  }

  // Get the selected variant
  const selectedVariant = variants[transitionType]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={renderKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={selectedVariant}
        transition={{ duration, ease: "easeInOut" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
