import type React from "react"
import { AnimationProvider } from "@/contexts/animation-context"
import { PageTransitionWrapper } from "@/components/animations/page-transition-wrapper"

export default function ThanksLayout({ children }: { children: React.ReactNode }) {
  return (
    <AnimationProvider>
      <PageTransitionWrapper>{children}</PageTransitionWrapper>
    </AnimationProvider>
  )
}
