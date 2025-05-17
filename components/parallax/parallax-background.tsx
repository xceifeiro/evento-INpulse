"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, type ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import Image from "next/image"

interface ParallaxBackgroundProps {
  backgroundImage: string
  backgroundAlt?: string
  children: ReactNode
  className?: string
  overlayColor?: string
  speed?: number
}

export function ParallaxBackground({
  backgroundImage,
  backgroundAlt = "Background image",
  children,
  className = "",
  overlayColor = "rgba(0, 0, 0, 0.4)",
  speed = 0.5,
}: ParallaxBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", `${30 * speed}%`])

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Background with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={
            prefersReducedMotion
              ? {}
              : {
                  y: backgroundY,
                  scale: 1.2, // Slightly larger to prevent white edges during movement
                }
          }
        >
          <Image src={backgroundImage || "/placeholder.svg"} alt={backgroundAlt} fill className="object-cover" />
          {/* Overlay */}
          <div className="absolute inset-0" style={{ backgroundColor: overlayColor }} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
