"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"

interface RequireAuthProps {
  children: React.ReactNode
  requiredRole?: string
}

export function RequireAuth({ children, requiredRole }: RequireAuthProps) {
  const { user, isLoading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/admin/login")
    }

    if (!isLoading && user && requiredRole === "superadmin" && !isAdmin) {
      router.push("/admin/unauthorized")
    }
  }, [user, isLoading, router, requiredRole, isAdmin])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#821423]"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (requiredRole === "superadmin" && !isAdmin) {
    return null
  }

  return <>{children}</>
}
