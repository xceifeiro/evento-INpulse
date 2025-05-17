"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface OptimizedBackgroundProps {
  src: string
  lowQualitySrc?: string
  className?: string
  children?: React.ReactNode
  overlayClassName?: string
}

export function OptimizedBackground({
  src,
  lowQualitySrc,
  className,
  children,
  overlayClassName,
}: OptimizedBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [bgImage, setBgImage] = useState(lowQualitySrc || "")

  useEffect(() => {
    // Resetar estado quando a fonte mudar
    setIsLoaded(false)
    setBgImage(lowQualitySrc || "")

    // Pré-carregar a imagem de alta qualidade
    const img = new Image()
    img.src = src
    img.onload = () => {
      setBgImage(src)
      setIsLoaded(true)
    }

    return () => {
      img.onload = null
    }
  }, [src, lowQualitySrc])

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      {/* Overlay opcional */}
      {overlayClassName && <div className={cn("absolute inset-0", overlayClassName)} />}

      {/* Conteúdo */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
