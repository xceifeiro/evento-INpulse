import { createServerComponentClient } from "../supabase/client"
import type { Post, PostsResponse, Category } from "./types"
import { formatPostData, formatCategoryData } from "./utils"

export async function getPosts(page = 1, pageSize = 10, categorySlug?: string): Promise<PostsResponse> {
  const supabase = createServerComponentClient()
  const offset = (page - 1) * pageSize

  // Consulta base para posts publicados
  let query = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .eq("published", true)
    .order("published_at", { ascending: false })
    .range(offset, offset + pageSize - 1)

  // Filtrar por categoria se fornecido
  if (categorySlug) {
    const { data: category } = await supabase.from("categories").select("id").eq("slug", categorySlug).single()

    if (category) {
      const { data: postIds } = await supabase.from("post_categories").select("post_id").eq("category_id", category.id)

      if (postIds && postIds.length > 0) {
        const ids = postIds.map((item) => item.post_id)
        query = query.in("id", ids)
      } else {
        // Nenhum post nesta categoria
        return { posts: [], count: 0 }
      }
    }
  }

  const { data: posts, count, error } = await query

  if (error) {
    console.error("Erro ao buscar posts:", error)
    return { posts: [], count: 0 }
  }

  // Buscar autores e categorias para cada post
  const formattedPosts = await Promise.all(
    posts.map(async (post) => {
      // Buscar autor
      let author = null
      if (post.author_id) {
        const { data: authorData } = await supabase.from("authors").select("*").eq("id", post.author_id).single()

        if (authorData) {
          author = authorData
        }
      }

      // Buscar categorias
      const { data: postCategories } = await supabase
        .from("post_categories")
        .select("category_id")
        .eq("post_id", post.id)

      const categories: any[] = []
      if (postCategories && postCategories.length > 0) {
        const categoryIds = postCategories.map((pc) => pc.category_id)
        const { data: categoriesData } = await supabase.from("categories").select("*").in("id", categoryIds)

        if (categoriesData) {
          categories.push(...categoriesData)
        }
      }

      return formatPostData(post, author, categories)
    }),
  )

  return {
    posts: formattedPosts,
    count: count || 0,
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createServerComponentClient()

  const { data: post, error } = await supabase.from("posts").select("*").eq("slug", slug).eq("published", true).single()

  if (error || !post) {
    console.error("Erro ao buscar post:", error)
    return null
  }

  // Incrementar visualizações
  await supabase
    .from("posts")
    .update({ views: post.views + 1 })
    .eq("id", post.id)

  // Buscar autor
  let author = null
  if (post.author_id) {
    const { data: authorData } = await supabase.from("authors").select("*").eq("id", post.author_id).single()

    if (authorData) {
      author = authorData
    }
  }

  // Buscar categorias
  const { data: postCategories } = await supabase.from("post_categories").select("category_id").eq("post_id", post.id)

  const categories: any[] = []
  if (postCategories && postCategories.length > 0) {
    const categoryIds = postCategories.map((pc) => pc.category_id)
    const { data: categoriesData } = await supabase.from("categories").select("*").in("id", categoryIds)

    if (categoriesData) {
      categories.push(...categoriesData)
    }
  }

  return formatPostData(post, author, categories)
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createServerComponentClient()

  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) {
    console.error("Erro ao buscar categorias:", error)
    return []
  }

  return data.map(formatCategoryData)
}

export async function getRecentPosts(limit = 5): Promise<Post[]> {
  const supabase = createServerComponentClient()

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Erro ao buscar posts recentes:", error)
    return []
  }

  // Buscar autores para cada post
  const formattedPosts = await Promise.all(
    posts.map(async (post) => {
      // Buscar autor
      let author = null
      if (post.author_id) {
        const { data: authorData } = await supabase.from("authors").select("*").eq("id", post.author_id).single()

        if (authorData) {
          author = authorData
        }
      }

      return formatPostData(post, author, [])
    }),
  )

  return formattedPosts
}
