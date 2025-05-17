"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  totalPages: number
  currentPage: number
  basePath?: string
}

export function Pagination({ totalPages, currentPage, basePath }: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Função para criar URL com parâmetros de consulta
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("pagina", pageNumber.toString())
    return `${basePath || pathname}?${params.toString()}`
  }

  // Não mostrar paginação se houver apenas uma página
  if (totalPages <= 1) {
    return null
  }

  // Determinar quais páginas mostrar
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Mostrar todas as páginas se houver menos que o máximo
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Sempre mostrar a primeira página
      pageNumbers.push(1)

      // Calcular páginas do meio
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Ajustar se estiver no início ou fim
      if (currentPage <= 2) {
        endPage = 4
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3
      }

      // Adicionar elipses se necessário
      if (startPage > 2) {
        pageNumbers.push("...")
      }

      // Adicionar páginas do meio
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      // Adicionar elipses se necessário
      if (endPage < totalPages - 1) {
        pageNumbers.push("...")
      }

      // Sempre mostrar a última página
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex justify-center mt-8" aria-label="Paginação">
      <ul className="flex items-center gap-1">
        {/* Botão Anterior */}
        <li>
          <Link
            href={createPageURL(Math.max(1, currentPage - 1))}
            className={`flex items-center justify-center w-9 h-9 rounded-md ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100 transition-colors"
            }`}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : undefined}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Página anterior</span>
          </Link>
        </li>

        {/* Números de página */}
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="flex items-center justify-center w-9 h-9 text-gray-500">...</span>
            ) : (
              <Link
                href={createPageURL(page)}
                className={`flex items-center justify-center w-9 h-9 rounded-md ${
                  currentPage === page
                    ? "bg-[#821423] text-white font-medium"
                    : "text-gray-700 hover:bg-gray-100 transition-colors"
                }`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </Link>
            )}
          </li>
        ))}

        {/* Botão Próximo */}
        <li>
          <Link
            href={createPageURL(Math.min(totalPages, currentPage + 1))}
            className={`flex items-center justify-center w-9 h-9 rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100 transition-colors"
            }`}
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : undefined}
          >
            <ChevronRight className="w-4 h-4" />
            <span className="sr-only">Próxima página</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
