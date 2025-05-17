import type React from "react"
import Link from "next/link"
import { getCategories, getRecentPosts } from "@/lib/blog/api"
import { formatDate } from "@/lib/blog/utils"
import { Newsletter } from "@/components/blog/newsletter"

interface BlogLayoutProps {
  children: React.ReactNode
}

export async function BlogLayout({ children }: BlogLayoutProps) {
  const categories = await getCategories()
  const recentPosts = await getRecentPosts(5)

  return (
    <div className="bg-gray-50">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Conteúdo principal */}
          <main className="flex-1">{children}</main>

          {/* Sidebar */}
          <aside className="w-full md:w-80 space-y-8">
            {/* Newsletter */}
            <Newsletter />

            {/* Categorias */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4 text-[#821423]">Categorias</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/blog/categoria/${category.slug}`}
                      className="text-gray-700 hover:text-[#1a8c91] transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Posts recentes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4 text-[#821423]">Posts Recentes</h3>
              <ul className="space-y-4">
                {recentPosts.map((post) => (
                  <li key={post.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <Link href={`/blog/${post.slug}`} className="group">
                      <h4 className="font-medium text-gray-800 group-hover:text-[#1a8c91] transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(post.publishedAt || post.createdAt)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sobre o blog */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4 text-[#821423]">Sobre o Blog</h3>
              <p className="text-gray-700 text-sm">
                Acompanhe as novidades do mundo do networking empresarial, dicas para expandir sua rede de contatos e
                informações sobre os próximos eventos do INpulse.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
