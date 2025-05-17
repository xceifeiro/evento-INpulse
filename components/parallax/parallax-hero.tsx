"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, type ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import Image from "next/image"

interface ParallaxHeroProps {
  backgroundImage: string
  backgroundAlt?: string
  children: ReactNode
  className?: string
  overlayColor?: string
  height?: string
}

export function ParallaxHero({
  backgroundImage,
  backgroundAlt = "Background image",
  children,
  className = "",
  overlayColor = "rgba(0, 0, 0, 0.4)",
  height = "min-h-[80vh]",
}: ParallaxHeroProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${height} ${className}`}>
      {/* Background Image with Parallax */}
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
        <Image src={backgroundImage || "/placeholder.svg"} alt={backgroundAlt} fill priority className="object-cover" />
        {/* Overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: overlayColor }} />
      </motion.div>

      {/* Content with Parallax */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-full h-full"
        style={
          prefersReducedMotion
            ? {}
            : {
                y: contentY,
                opacity,
              }
        }
      >
        {children}
      </motion.div>
    </div>
  )
}
