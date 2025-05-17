"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Users, Settings, LogOut, Menu, X, ChevronDown } from "lucide-react"

type NavItem = {
  title: string
  href: string
  icon: React.ReactNode
  requiredRole?: string
}

export function AdminNav() {
  const pathname = usePathname()
  const { signOut, isAdmin, user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/admin/blog",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Posts",
      href: "/admin/blog/posts/new",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Usuários",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
      requiredRole: "superadmin",
    },
    {
      title: "Configurações",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen)

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
        <Link href="/admin/blog" className="font-bold text-xl text-[#821423]">
          InPulse Admin
        </Link>
        <Button variant="ghost" onClick={toggleMenu} size="icon">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white pt-16">
          <div className="flex flex-col p-4 space-y-4">
            {navItems
              .filter((item) => !item.requiredRole || (isAdmin && item.requiredRole === "superadmin"))
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md",
                    pathname === item.href ? "bg-[#821423] text-white" : "hover:bg-gray-100",
                  )}
                  onClick={toggleMenu}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
            <Button
              variant="ghost"
              className="flex items-center justify-start space-x-3 px-3 py-2 w-full text-left"
              onClick={signOut}
            >
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden lg:flex h-screen">
        <div className="w-64 bg-white border-r flex flex-col">
          <div className="p-4 border-b">
            <Link href="/admin/blog" className="font-bold text-xl text-[#821423]">
              InPulse Admin
            </Link>
          </div>
          <div className="flex-1 py-6 px-3 space-y-1">
            {navItems
              .filter((item) => !item.requiredRole || (isAdmin && item.requiredRole === "superadmin"))
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md",
                    pathname === item.href ? "bg-[#821423] text-white" : "hover:bg-gray-100",
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
          </div>
          <div className="p-4 border-t">
            <div className="relative">
              <Button variant="ghost" className="flex items-center justify-between w-full" onClick={toggleUserMenu}>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#821423] text-white flex items-center justify-center mr-2">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-sm text-left">
                    <div className="font-medium truncate max-w-[120px]">{user?.email}</div>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
              {isUserMenuOpen && (
                <div className="absolute bottom-full mb-2 w-full bg-white border rounded-md shadow-lg">
                  <Button variant="ghost" className="flex items-center w-full px-3 py-2 text-left" onClick={signOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Sair</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
