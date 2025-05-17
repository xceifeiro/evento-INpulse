"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, type ReactNode, useMemo } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface Layer {
  content: ReactNode
  depth: number // 0 = sem movimento, 1 = movimento máximo
  className?: string
}

interface ParallaxLayersProps {
  layers: Layer[]
  className?: string
  height?: string
}

export function ParallaxLayers({ layers, className = "", height = "min-h-[50vh]" }: ParallaxLayersProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const yValues = useMemo(() => {
    return layers.map((layer) => {
      return useTransform(scrollYProgress, [0, 1], [0, 100 * layer.depth])
    })
  }, [scrollYProgress, layers])

  // Se o usuário preferir movimento reduzido, não aplicar efeito
  if (prefersReducedMotion) {
    return (
      <div className={`relative ${height} ${className}`}>
        {layers.map((layer, index) => (
          <div key={index} className={`absolute inset-0 ${layer.className || ""}`}>
            {layer.content}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className={`relative ${height} ${className}`}>
      {layers.map((layer, index) => {
        return (
          <motion.div key={index} style={{ y: yValues[index] }} className={`absolute inset-0 ${layer.className || ""}`}>
            {layer.content}
          </motion.div>
        )
      })}
    </div>
  )
}
