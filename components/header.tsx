import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-14 sm:h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo Image */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.webp" alt="INpulse Logo" width={120} height={120} className="h-12 w-auto object-contain" />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link
            href="/"
            className="text-xs lg:text-sm font-medium hover:text-[#1a8c91] transition-colors relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1a8c91] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/#sobre"
            className="text-xs lg:text-sm font-medium hover:text-[#1a8c91] transition-colors relative group"
          >
            Sobre
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1a8c91] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/#rodadas"
            className="text-xs lg:text-sm font-medium hover:text-[#1a8c91] transition-colors relative group"
          >
            Rodadas
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1a8c91] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/#beneficios"
            className="text-xs lg:text-sm font-medium hover:text-[#1a8c91] transition-colors relative group"
          >
            Benefícios
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1a8c91] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/#ingressos"
            className="text-xs lg:text-sm font-medium hover:text-[#1a8c91] transition-colors relative group"
          >
            Ingressos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1a8c91] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/#contato"
            className="text-xs lg:text-sm font-medium hover:text-[#1a8c91] transition-colors relative group"
          >
            Contato
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1a8c91] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            asChild
            className="hidden md:flex bg-[#821423] hover:bg-[#6a1019] shadow-md transform hover:scale-105 transition-all duration-300 text-xs lg:text-sm px-3 lg:px-4 h-8 lg:h-9"
          >
            <Link href="/#ingressos">Garanta sua vaga</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden h-8 w-8">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[75vw] sm:max-w-sm">
              <div className="flex items-center gap-2 mb-6">
                <Image
                  src="/logo.webp"
                  alt="INpulse Logo"
                  width={120}
                  height={120}
                  className="h-15 w-auto object-contain"
                />
              </div>
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-sm font-medium hover:text-[#1a8c91] transition-colors">
                  Home
                </Link>
                <Link href="/#sobre" className="text-sm font-medium hover:text-[#1a8c91] transition-colors">
                  Sobre
                </Link>
                <Link href="/#rodadas" className="text-sm font-medium hover:text-[#1a8c91] transition-colors">
                  Rodadas
                </Link>
                <Link href="/#beneficios" className="text-sm font-medium hover:text-[#1a8c91] transition-colors">
                  Benefícios
                </Link>
                <Link href="/#ingressos" className="text-sm font-medium hover:text-[#1a8c91] transition-colors">
                  Ingressos
                </Link>
                <Link href="/#contato" className="text-sm font-medium hover:text-[#1a8c91] transition-colors">
                  Contato
                </Link>
                <Button asChild className="mt-4 bg-[#821423] hover:bg-[#6a1019]">
                  <Link href="/#ingressos">Garanta sua vaga</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
