"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

type TransitionType = "fade" | "slide" | "scale" | "none"

interface AnimationContextType {
  transitionType: TransitionType
  duration: number
  setTransitionType: (type: TransitionType) => void
  setDuration: (duration: number) => void
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const [transitionType, setTransitionType] = useState<TransitionType>(prefersReducedMotion ? "none" : "fade")
  const [duration, setDuration] = useState(0.3)

  return (
    <AnimationContext.Provider
      value={{
        transitionType,
        duration,
        setTransitionType,
        setDuration,
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider")
  }
  return context
}
