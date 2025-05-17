import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Poppins, Anton } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { FloatingCountdown } from "@/components/floating-countdown"
import Script from "next/script"
import { ChatWidget } from "@/components/chat-widget/chat-widget"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
})

export const metadata: Metadata = {
  title: "INpulse - Maior evento de Networking e Conexões do Eixo Anápolis, Goiânia e Brasília",
  description:
    "Evento sem palestras – no INpulse é você quem fala. Rodadas de negócios, networking e oportunidades reais para empresários.",
  keywords: [
    "evento networking Anápolis 2025",
    "rodada de negócios Anápolis",
    "networking empresarial Anápolis",
    "evento de negócios em Anápolis",
    "coquetel de networking Anápolis",
    "pitch de vendas Anápolis",
    "conexões empresariais Anápolis",
    "encontro de empresários Anápolis",
    "geração de leads Anápolis",
    "conferência de negócios Anápolis",
  ],
  authors: [{ name: "INpulse" }],
  creator: "INpulse",
  publisher: "INpulse",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://evento.grupoinpulse.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "INpulse - Maior evento de Networking e Conexões",
    description:
      "Evento sem palestras – no INpulse é você quem fala. Rodadas de negócios, networking e oportunidades reais para empresários.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://evento.grupoinpulse.com.br",
    siteName: "INpulse",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "INpulse - Evento de Networking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INpulse - Maior evento de Networking e Conexões",
    description:
      "Evento sem palestras – no INpulse é você quem fala. Rodadas de negócios, networking e oportunidades reais para empresários.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: 'INpulse'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon-inpulse.svg" sizes="any" />
        <link rel="icon" href="/favicon-inpulse.svg" type="image/svg" sizes="16x16" />
        <link rel="icon" href="/favicon-inpulse.svg" type="image/svg" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preload de recursos críticos */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${montserrat.variable} ${poppins.variable} ${anton.variable} font-montserrat`}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <FloatingCountdown />
            <ChatWidget />
          </ThemeProvider>

        {/* Script para registrar o Service Worker */}
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js').catch(
                    function(err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}