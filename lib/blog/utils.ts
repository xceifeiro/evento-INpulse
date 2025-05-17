import type { Post, Author, Category } from "./types"

export function formatDate(dateString: string | null): string {
  if (!dateString) return ""

  const date = new Date(dateString)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date)
}

export function formatPostData(post: any, author: any | null = null, categories: any[] = []): Post {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featuredImage: post.featured_image,
    author: author ? formatAuthorData(author) : null,
    categories: categories.map(formatCategoryData),
    published: post.published,
    publishedAt: post.published_at,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    views: post.views,
  }
}

export function formatAuthorData(author: any): Author {
  return {
    id: author.id,
    name: author.name,
    email: author.email,
    bio: author.bio,
    avatarUrl: author.avatar_url,
  }
}

export function formatCategoryData(category: any): Category {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
  }
}

export function generateExcerpt(content: string, maxLength = 160): string {
  // Remove tags HTML
  const textOnly = content.replace(/<\/?[^>]+(>|$)/g, "")

  if (textOnly.length <= maxLength) {
    return textOnly
  }

  // Corta no último espaço antes do limite para não cortar palavras
  const excerpt = textOnly.substring(0, maxLength)
  const lastSpace = excerpt.lastIndexOf(" ")

  return excerpt.substring(0, lastSpace) + "..."
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}
