import Link from "next/link"
import Image from "next/image"
import type { Post } from "@/lib/blog/types"
import { formatDate } from "@/lib/blog/utils"

interface PostCardProps {
  post: Post
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article
      className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${
        featured ? "md:grid md:grid-cols-2 gap-6" : ""
      }`}
    >
      {/* Imagem */}
      <div className={`${featured ? "h-full" : "h-48 sm:h-56"} relative`}>
        <Link href={`/blog/${post.slug}`}>
          <Image
            src={post.featuredImage || "/placeholder.svg?height=400&width=600&query=blog post"}
            alt={post.title}
            fill
            sizes={
              featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
            className="object-cover"
            loading={featured ? "eager" : "lazy"}
          />
        </Link>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        {/* Categorias */}
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/categoria/${category.slug}`}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-[#1a8c91]/10 hover:text-[#1a8c91] transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Título */}
        <h2 className={`font-bold text-gray-800 mb-2 ${featured ? "text-2xl" : "text-xl"}`}>
          <Link href={`/blog/${post.slug}`} className="hover:text-[#821423] transition-colors">
            {post.title}
          </Link>
        </h2>

        {/* Resumo */}
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        {/* Metadados */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            {post.author && (
              <>
                <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden relative">
                  {post.author.avatarUrl ? (
                    <Image
                      src={post.author.avatarUrl || "/placeholder.svg"}
                      alt={post.author.name}
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#1a8c91] text-white text-xs">
                      {post.author.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span>{post.author.name}</span>
              </>
            )}
          </div>
          <time dateTime={post.publishedAt || post.createdAt}>{formatDate(post.publishedAt || post.createdAt)}</time>
        </div>
      </div>
    </article>
  )
}
