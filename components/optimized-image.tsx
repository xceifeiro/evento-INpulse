"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError" | "blurDataURL"> {
  lowQualitySrc?: string
  fadeIn?: boolean
  loadingColor?: string
}

export function OptimizedImage({
  src,
  alt,
  className,
  lowQualitySrc,
  fadeIn = true,
  loadingColor = "#f3f4f6",
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Reset state when src changes
  useEffect(() => {
    setIsLoaded(false)
    setError(false)
  }, [src])

  // Generate a low quality placeholder if not provided
  const placeholder =
    lowQualitySrc || (typeof src === "string" ? `/api/image-placeholder?url=${encodeURIComponent(src)}` : undefined)

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        backgroundColor: loadingColor,
      }}
    >
      {/* Low quality placeholder */}
      {placeholder && !isLoaded && !error && (
        <Image
          src={placeholder || "/placeholder.svg"}
          alt={alt}
          fill={props.fill}
          width={props.width}
          height={props.height}
          className={cn("object-cover", props.objectFit || "object-cover", "blur-sm scale-105")}
          priority={false}
          quality={10}
        />
      )}

      {/* Main image */}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        {...props}
        className={cn(
          props.objectFit || "object-cover",
          fadeIn && "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          props.className,
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  )
}
