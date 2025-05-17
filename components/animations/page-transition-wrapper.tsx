"use client"

import type { ReactNode } from "react"
import { PageTransition } from "./page-transition"
import { useAnimation } from "@/contexts/animation-context"

export function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const { transitionType, duration } = useAnimation()

  return (
    <PageTransition transitionType={transitionType} duration={duration}>
      {children}
    </PageTransition>
  )
}
