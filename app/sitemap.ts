import type { MetadataRoute } from "next"
import { createServerComponentClient } from "@/lib/supabase/client"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inpulse.com.br"
  const supabase = createServerComponentClient()

  // Páginas estáticas
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ] as MetadataRoute.Sitemap

  // Buscar posts do blog
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("published", true)
    .order("published_at", { ascending: false })

  const postUrls = posts
    ? (posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: "weekly",
        priority: 0.8,
      })) as MetadataRoute.Sitemap)
    : []

  // Buscar categorias do blog
  const { data: categories } = await supabase.from("categories").select("slug, updated_at").order("name")

  const categoryUrls = categories
    ? (categories.map((category) => ({
        url: `${baseUrl}/blog/categoria/${category.slug}`,
        lastModified: new Date(category.updated_at),
        changeFrequency: "weekly",
        priority: 0.7,
      })) as MetadataRoute.Sitemap)
    : []

  return [...staticPages, ...postUrls, ...categoryUrls]
}
