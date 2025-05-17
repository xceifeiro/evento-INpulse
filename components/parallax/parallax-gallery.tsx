"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import Image from "next/image"

interface ParallaxGalleryProps {
  images: {
    src: string
    alt: string
  }[]
  className?: string
  itemClassName?: string
}

export function ParallaxGallery({ images, className = "", itemClassName = "" }: ParallaxGalleryProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Se o usuário preferir movimento reduzido, não aplicar efeito
  if (prefersReducedMotion) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {images.map((image, index) => (
          <div key={index} className={`relative aspect-square overflow-hidden rounded-lg ${itemClassName}`}>
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    )
  }

  const parallaxValues = images.map((_, index) => {
    const direction = index % 2 === 0 ? -1 : 1
    const speed = 0.3 + (index % 3) * 0.1
    return useTransform(scrollYProgress, [0, 1], [0, 100 * direction * speed])
  })

  return (
    <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {images.map((image, index) => {
        return (
          <motion.div
            key={index}
            style={{ y: parallaxValues[index] }}
            className={`relative aspect-square overflow-hidden rounded-lg ${itemClassName}`}
          >
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
          </motion.div>
        )
      })}
    </div>
  )
}
