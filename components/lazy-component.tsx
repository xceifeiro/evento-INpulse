"use client"

import type React from "react"

import { Suspense, lazy, type ComponentType } from "react"
import { Loader2 } from "lucide-react"

interface LazyComponentProps {
  component: () => Promise<{ default: ComponentType<any> }>
  props?: Record<string, any>
  fallback?: React.ReactNode
}

export function LazyComponent({ component, props = {}, fallback }: LazyComponentProps) {
  const LazyComponent = lazy(component)

  return (
    <Suspense
      fallback={
        fallback || (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#821423]" />
          </div>
        )
      }
    >
      <LazyComponent {...props} />
    </Suspense>
  )
}
