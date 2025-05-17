"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

export function ThirdPartyScripts() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Verificar se o usuário interagiu com a página
    const handleInteraction = () => {
      setIsVisible(true)

      // Remover event listeners após a primeira interação
      window.removeEventListener("scroll", handleInteraction)
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
      window.removeEventListener("mousemove", handleInteraction)
      window.removeEventListener("touchstart", handleInteraction)
    }

    // Adicionar event listeners para detectar interação
    window.addEventListener("scroll", handleInteraction, { passive: true })
    window.addEventListener("click", handleInteraction, { passive: true })
    window.addEventListener("keydown", handleInteraction, { passive: true })
    window.addEventListener("mousemove", handleInteraction, { passive: true })
    window.addEventListener("touchstart", handleInteraction, { passive: true })

    // Carregar scripts após 3 segundos mesmo sem interação
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleInteraction)
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
      window.removeEventListener("mousemove", handleInteraction)
      window.removeEventListener("touchstart", handleInteraction)
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <>
      {/* Exemplo de script de terceiros (Google Tag Manager) */}
      <Script
        id="gtm"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `,
        }}
      />

      {/* Outros scripts de terceiros podem ser adicionados aqui */}
    </>
  )
}
