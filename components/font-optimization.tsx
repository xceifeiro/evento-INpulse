"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function FontOptimization() {
  const pathname = usePathname()

  useEffect(() => {
    // Adicionar link para preload de fontes críticas
    const fontPreloadLinks = [
      {
        rel: "preload",
        href: "/fonts/anton-v23-latin-regular.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/montserrat-v25-latin-regular.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ]

    // Adicionar links ao head
    fontPreloadLinks.forEach((linkProps) => {
      const link = document.createElement("link")
      Object.entries(linkProps).forEach(([key, value]) => {
        link.setAttribute(key, value)
      })
      document.head.appendChild(link)
    })

    // Limpar links ao desmontar
    return () => {
      document.querySelectorAll("link[rel='preload'][as='font']").forEach((link) => {
        document.head.removeChild(link)
      })
    }
  }, [pathname])

  return null
}
