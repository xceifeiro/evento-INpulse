import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Verificar se o usuário está autenticado
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Verificar se a rota é administrativa
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")
  const isLoginRoute = req.nextUrl.pathname === "/admin/login"

  // Se for uma rota administrativa (exceto login) e o usuário não estiver autenticado, redirecionar para login
  if (isAdminRoute && !isLoginRoute && !session) {
    const redirectUrl = new URL("/admin/login", req.url)
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Se o usuário estiver autenticado e tentar acessar a página de login, redirecionar para o dashboard
  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL("/admin/blog", req.url))
  }

  return res
}

// Configurar quais rotas o middleware deve ser executado
export const config = {
  matcher: ["/admin/:path*"],
}
